import cors from 'cors'
const express = require('express')
const app = express()
const initRoutes = require('./src/routes')
require('./connect_db')
require ('dotenv').config()
const PORT = process.env.PORT || 8888


app.use(cors({
    origin: process.env.CLIENT_URL ,//lay data trong file dotenv
    methods: ['GET','POST','PUT','DELETE']
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
initRoutes(app)


const listener = app.listen(PORT, ()=>{
    console.log('server is running on the port '+listener.address().port)   
})


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