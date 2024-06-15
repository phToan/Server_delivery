import db from "../models";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

export const register_dri = (body) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Driver.findOrCreate({
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
            ? jwt.sign({ id: response[0].id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '7d' })
            : null
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Account registration is successful' : 'Account is already exists',
            'access_token': `Bearer ${accessToken}`,
            'refresh_token': refreshToken
        })
        if (refreshToken) {
            await db.Driver.update({ refresh_token: refreshToken }, {
                where: { id: response[0].id }
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const login_dri = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Driver.findOne({
            where: { phone },
            raw: true
        })
        const isCheck = response && bcrypt.compareSync(password, response.password)
        const accessToken = isCheck
            ? jwt.sign({ id: response.id, name: response.name, phone: response.phone }, process.env.JWT_SECRET, { expiresIn: '1d' })
            : null
        const refreshToken = isCheck
            ? jwt.sign({ id: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '7d' })
            : null
        resolve({
            err: accessToken ? 0 : 1,
            mess: accessToken ? 'Login is successful' : response ? 'Password is wrong' : 'Acccount has not been registered',
            'access_token': `Bearer ${accessToken}`,
            'refresh_token': refreshToken
        })
        if (refreshToken) {
            await db.Driver.update({ refresh_token: refreshToken }, {
                where: { id: response.id }
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const getDriver = (ID) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Driver.findOne({
            where: { id: ID },
            attributes: {
                // exclude: ['password', 'refresh_token', 'status', 'createdAt', 'updatedAt']
            }
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

export const getAllDriver = (ID) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Driver.findAndCountAll({
            attributes: {
                exclude: ['password', 'refresh_token', 'createdAt', 'updatedAt']
            }
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

export const get_user = (body) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Driver.findOne({
            where: { id: body.id },
            attributes: {
                exclude: ['password', 'refresh_token', 'status', 'createdAt', 'updatedAt']
            }
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

export const updateDriver = ({...query}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Driver.update(query, {
            where: {id: query.id}
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            mes: response[0] > 0 ? 'update successfully' : 'update failed',
            userData: response[1]
        })
    } catch (error) {
        reject(error)
    }
})

export const update_pass_dri = ({ id, password, newPassword }) => new Promise(async (resolve, reject) => {
    try {
        const res = await db.Driver.findOne({
            where: { id },
            raw: true
        })
        const isCheck = res && bcrypt.compareSync(password, res.password)

        if (isCheck) {
            const response = await db.Driver.update({ password: hashPassword(newPassword) }, {
                where: { id }
            })
            resolve({
                err: response[0] > 0 ? 0 : 1,
                mes: response[0] > 0 ? 'update successfully' : 'update failed'
            })
        } else {
            resolve({
                err: 2,
                mes: 'password is not correct'
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const refreshToken_dri = ({ refresh_token }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Driver.findOne({
            where: { refresh_token }
        })
        if (response) {
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err) => {
                if (err) {
                    resolve({
                        err: 2,
                        mes: 'Refresh token expired. Require re-login'
                    })
                } else {
                    const accessToken = jwt.sign({ id: response.id, name: response.name, phone: response.phone }, process.env.JWT_SECRET, { expiresIn: '60s' })
                    resolve({
                        err: accessToken ? 0 : 1,
                        mes: accessToken ? 'Done' : 'Fail to generate new access token. Let try more time',
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