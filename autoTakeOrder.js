import { getDatabase, ref, onValue } from 'firebase/database';
import axios from 'axios';
import {} from 'firebase/auth';
import Firebase from './firebase';

const getOrder = (callback) => {
    const database = getDatabase(Firebase);
    const dataRef = ref(database, 'order');
    let arrOrder = [];
    const onDataChange = (snapshot) => {
        const newData = snapshot.val();
        const arr = Object.values(newData ?? []);
        const keys = Object.keys(snapshot.val() ?? []);
        arr.map((e, idx) => (e.key = keys[idx]));
        arrOrder = arr.filter((e) => e.driver.id === 0);
        callback(arrOrder);
    };
    // Đăng ký sự kiện onDataChange
    onValue(dataRef, onDataChange);
};

const AutoTakenOrder = () => {
    const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK';
    const database = getDatabase(Firebase);
    const dataRef = ref(database, 'active_status');
    const onDataChange = async (snapshot) => {
        const newData = snapshot.val();
        const arr = Object.values(newData ?? []);
        const arrNoTaken = arr.filter((e) => e.isTaken === false);
        const itemTaken = arrNoTaken?.[findMaxValueIndex(arrNoTaken)];
        try {
            if (itemTaken) {
                let origin = `${itemTaken.lat},${itemTaken.long}`;
                console.log(itemTaken.id);
                getOrder(async (arrOrder) => {
                    let arrDistance = [];
                    // console.log('Returned arrOrder: ', arrOrder);
                    // arrOrder.map();
                    const promises = arrOrder.map(async (e) => {
                        const destination = `${e?.senderInfo?.lat},${e?.senderInfo?.long}`;
                        const response = await axios(
                            `https://rsapi.goong.io/Direction?api_key=${API_KEY}&vehicle=bike&&origin=${origin}&destination=${destination}`
                        );
                        const data = await response.data;
                        if (
                            data.geocoded_waypoints[0].geocoder_status === 'OK'
                        ) {
                            const distanceString =
                                data.routes[0].legs[0].distance.value;
                            const distance = parseFloat(distanceString);
                            arrDistance.push({
                                id: e?.key,
                                distance: distance,
                            });
                        }
                    });
                    await Promise.all(promises);
                    console.log(
                        'arrDistance: ',
                        arrDistance[findMinValueIndex(arrDistance)]
                    );
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    onValue(dataRef, onDataChange);
};

function findMinValueIndex(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let minValue = arr[0]?.distance;
    let minIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i]?.distance < minValue) {
            minValue = arr[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function findMaxValueIndex(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let maxValue = arr[0]?.point;
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i]?.point > maxValue) {
            maxValue = arr[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}

module.exports = AutoTakenOrder;
