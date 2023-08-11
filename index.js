import cors from 'cors'
const express = require('express')
const app = express()
const initRoutes = require('./src/routes')
require('./connect_db')
require ('dotenv').config()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
initRoutes(app)

// const PORT = process.env.PORT || 8888
const listener = app.listen(PORT, ()=>{
    console.log('server is running on the port '+listener.address().port)   
})


// {
//     origin: process.env.CLIENT_URL ,//lay data trong file dotenv
//     methods: ['GET','POST','PUT','DELETE']
// }


    //KIỂU MAP 
    // socket.on('placeOrder', (orderJson) => {
    //     const order = JSON.parse(orderJson);
    //     order.customerID = socket.id;
    //     orders.set(order.id, order);
    //     io.to(DRIVER_ROOM).emit('newOrder', order);
    // });

    // socket.on('takeOrder', (object) => {
    //     const data = JSON.parse(object);
    //     console.log(data.id);
    //     const order = orders.get(data.id);
    //     if (order) {
    //         const customerSocketId = order.customerID;
    //         io.to(customerSocketId).emit('orderTaken', object);
    //         console.log(customerSocketId);
    //     }
    // });

    //KIỂU SET
    // socket.on('placeOrder', (orderJson) => {
    //     const order = JSON.parse(orderJson);
    //     order.customerID = socket.id;
    //     orders.add(order);
    //     io.to(DRIVER_ROOM).emit('newOrder', order);
    // });

    // socket.on('takeOrder', (object) => {
    //     const data = JSON.parse(object);
    //     console.log(data.id);
    //     for (const order of orders) {
    //         if (order.id === data.id) {
    //             const customerSocketId = order.customerID;
    //             io.to(customerSocketId).emit('orderTaken', object);
    //             console.log(customerSocketId);
    //             break;
    //         }
    //     }
    // });