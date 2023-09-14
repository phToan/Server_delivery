import db from '../models'

export const createSocket = (body) => new Promise(async (resolve, reject) => {
    try {
        console.log(body)
        const response = await db.Socket.findOrCreate({
            where: {
                user_id: body.user_id,
                type: body.type
            },
            default: {
                ...body
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'socket registration is successful' : 'socket is already exists',
        })
    } catch (error) {
        reject(error)
    }
})

export const getSocket = ({ ...query }) => new Promise(async (resolve, reject) => {
    try {
        console.log(query)
        const response = await db.Socket.findOne({
            where: {
                user_id: query.user_id,
                type: query.type
            },
            attributes: ['socket_id']
        })
        // console.log(response)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'successfully' : 'failed',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateSocket = (body) => new Promise(async (resolve, reject) => {
    try {
        console.log(body)
        const response = await db.Socket.update({...body},{
            where: {
                user_id: body.user_id,
                type: body.type
            }
        })
        // console.log(response)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'successfully' : 'failed'
        })
    } catch (error) {
        reject(error)
    }
})