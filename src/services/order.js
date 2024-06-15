import { query } from 'express'
import db from '../models'
import { Op } from 'sequelize'
import { v4 } from 'uuid'

export const createOrder = (body) => new Promise(async (resolve, reject) => {
    try {
        console.log(body)
        const response = await db.Order.create(body)
        console.log(response)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Create orderer successfully' : 'Create order failed'
        })
    } catch (error) {
        reject(error)
        console.log(error);
    }
})

export const create_Order_dri = (body) => new Promise(async (resolve, reject) => {
    try {
        console.log(body);
        const response = await db.Order_driver.create(body)
        console.log(response)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Create orderer successfully' : 'Create order failed'
        })
    } catch (error) {
        console.log(error);
        reject(error)
    }
})

export const getOrder = ({...query}) => new Promise(async (resolve, reject) => {
    try {
        // const queries = {raw: true, nest: true};
        const response = await db.Order.findAndCountAll({
            where: query,
            attributes: {
                exclude: ['updateAt']
            }
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'get orders failed',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

export const deleteOrder = (body) => new Promise(async (resolve, reject) => {
    try {
        console.log(body)
        const response = await db.Order.update({status: body.status},{
            where: {
                id: body.id
            }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? 'update successfully' : 'not found item'
        })
    } catch (error) {
        reject(error)
    }
})

export const get_Order_dri = ({...query}) => new Promise(async (resolve, reject) => {
    try {
        // const queries = {raw: true, nest: true};
        const response = await db.Order_driver.findAndCountAll({
            where: query,
            attributes: {
                exclude: ['updateAt', 'status']
            },
            include: [
                {model: db.Order, as: 'orderData', attributes:{exclude: ['confirm_order_at', 'createdAt', 'customer_id', 'delete_order_at', 'driver_id', 'status', 'updatedAt']}}
            ]
            // ...queries
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'get orders failed',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

export const getOrder_day = ({...query}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order_driver.findAndCountAll({
            where: {
                createdAt: {
                    [Op.substring]: query.day
                }
            },
            attributes: ['status'],
            include: [
                {model: db.Order, as: 'orderData', attributes:['price']}
            ]
            // ...queries
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'get orders failed',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

export const delete_Order_dri = (body) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order_driver.update({deleteAt: Date()},{
            where: {
                id: body.id
            }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? 'delete successfully' : 'not found item'
        })
    } catch (error) {
        reject(error)
    }
})

export const updateOrders = (body) => new Promise(async (resolve, reject) => {
    try {
        console.log(body)
        const response = await db.Order.update({...body},{
            where: {
                id: body.id
            }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? 'update successfully' : 'not found item'
        })
    } catch (error) {
        reject(error)
    }
})

export const updateOrder = (body) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order_driver.update({...body},{
            where: {
                id_Order: body.id_Order
            }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: response > 0 ? 'update successfully' : 'not found item'
        })
    } catch (error) {
        reject(error)
    }
})