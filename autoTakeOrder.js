import { getDatabase, ref, onValue, update } from "firebase/database";
import axios from "axios";
import {} from "firebase/auth";
import Firebase from "./firebase";
const database = getDatabase(Firebase);
const getOrder = (callback) => {
  const dataRef = ref(database, "order");
  let arrOrder = [];
  const onDataChange = (snapshot) => {
    const newData = snapshot.val();
    const arr = Object.values(newData ?? []);
    const keys = Object.keys(snapshot.val() ?? []);
    keys.length > 0 && (
      arr.map((e, idx) => (e.key = keys[idx]))
    )
    arrOrder = arr.filter((e) => e.driver.id === 0 && e.isAutoWait === false);
    callback(arrOrder);
  };
  onValue(dataRef, onDataChange);
};
const API_KEY = "uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK";
const AutoTakenOrder = () => {
  const database = getDatabase(Firebase);
  const dataRef = ref(database, "active_status");
  const onDataChange = async (snapshot) => {
    const newData = snapshot.val();
    const arr = Object.values(newData ?? []);
    const keys = Object.keys(snapshot.val() ?? []);
    arr.map((e, idx) => (e.key = keys[idx]));
    const arrNoTaken = arr.filter(
      (e) =>
        e.isTaken === false &&
        e.status === true &&
        e.isActive === true &&
        e.isPause === false
    );
    arrNoTaken.sort((a, b) => b.point - a.point);
    console.log("arrNoTaken: ", arrNoTaken);
    arrNoTaken.map((item) => {
      const origin = `${item?.lat},${item?.long}`;
      getOrder(async (arrOrder) => {
        console.log('arrOrder: ',arrOrder);
        arrOrder.map(async (e) => {
          const destination = `${e?.senderInfo?.lat},${e?.senderInfo?.long}`;
          const response = await axios(
            `https://rsapi.goong.io/Direction?api_key=${API_KEY}&vehicle=bike&&origin=${origin}&destination=${destination}`
          );
          const data = await response.data;
          if (data.geocoded_waypoints[0].geocoder_status === "OK") {
            const distanceString = data.routes[0].legs[0].distance.value;
            const distance = parseFloat(distanceString);
            console.log('distance: ', distance)
            if (distance <= 4000) {
              updateTaken(e.key, item.key);
            }
          }
        });
      });
    });
  };
  onValue(dataRef, onDataChange);
};

const updateTaken = (keyOrder, keyDriver) => {
  const data = {
    isTaken: true,
    isAssign: keyOrder,
  };
  const dataRefDriver = ref(database, `active_status/${keyDriver}`);
  const dataRefOrder = ref(database, `order/${keyOrder}`);
  update(dataRefDriver, data).catch((e) => {
    console.log("err: ", e);
  });
  update(dataRefOrder, { isAutoWait: true }).catch((e) => {
    console.log("err: ", e);
  });
};

module.exports = AutoTakenOrder;
