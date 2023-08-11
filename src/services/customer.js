import db from "../models";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { notAuth } from "../middlewares/handle_errors";

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

export const register = (body) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Customer.findOrCreate({
            where: { phone: body.phone },
            defaults: {
                ...body,
                password: hashPassword(body.password)
            }
        })
        const accessToken = response[1]
            ? jwt.sign({ id: response[0].id, name: response[0].name, phone: response[0].phone }, process.env.JWT_SECRET, { expiresIn: '15s' })
            : null

        const refreshToken = response[1]
            ? jwt.sign({ id: response[0].id, name: response[0].name, phone: response[0].phone }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '7d' })
            : null
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Account registration is successful' : 'Account is already exists',
            'access_token': `Bearer ${accessToken}`,
            'refresh_token': refreshToken
        })
        if(refreshToken){
            await db.Customer.update({refresh_token: refreshToken},{
                where: {id: response[0].id}
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const login = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Customer.findOne({
            where: { phone },
            raw: true
        })
        const isCheck = response && bcrypt.compareSync(password, response.password)
        const accessToken = isCheck
            ? jwt.sign({ id: response.id, name: response.name, phone: response.phone }, process.env.JWT_SECRET, { expiresIn: '15s' })
            : null
        const refreshToken = isCheck
            ? jwt.sign({ id: response.id, name: response.name, phone: response.phone }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '7d' })
            : null
        resolve({
            err: accessToken ? 0 : 1,
            mess: accessToken ? 'Login is successful' : response ? 'Password is wrong' : 'Acccount has not been registered',
            'access_token': `Bearer ${accessToken}`,
            'refresh_token': refreshToken
        })
        if(refreshToken){
            await db.Customer.update({refresh_token: refreshToken},{
                where: {id: response.id}
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const getUser = (userID) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Customer.findOne({
            where: { id: userID },
            attributes: ['id','name','dob','gender','phone','point','status']
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'User not found',
            userData: response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateCustomer = ({ ...body }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Customer.update(body, {
            where: { id:  body.id}
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            mes: response[0] > 0 ? 'update successfully' : 'update failed'
        })
    } catch (error) {
        reject(error)
    }
})

export const update_pass_cus = ({ id, password, newPassword }) => new Promise(async (resolve, reject) => {
    try {
        const res = await db.Customer.findOne({
            where: { id },
            raw: true
        })
        const isCheck = res && bcrypt.compareSync(password, res.password)

        if (isCheck) {
            const response = await db.Customer.update({ password: hashPassword(newPassword) }, {
                where: { id }
            })
            resolve({
                err: response[0] > 0 ? 0 : 1,
                mes: response[0] > 0 ? 'update successfully' : 'update failed'
            })
        } else {
            resolve({
                err: 1,
                mes: 'password is not correct'
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const refreshToken = ({ refresh_token }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Customer.findOne({
            where: { refresh_token }
        })
        
        if(response){
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err)=>{
                if(err){
                    resolve({
                        err: 1,
                        mes: 'Refresh token expired. Require login'
                    })
                }else{
                    const accessToken = jwt.sign({ id: response.id, name: response.name, phone: response.phone }, process.env.JWT_SECRET, { expiresIn: '60s' })
                    resolve({
                        err: accessToken ? 0 : 1,
                        mes: accessToken ? 'OK' : 'Fail to generate new access token. Let try more time',
                        'access_token': `Bearer ${accessToken}`,
                        'refresh_token': refresh_token
                    })
                }
            })
        }

    } catch (error) {
        reject(error)
    }
})



