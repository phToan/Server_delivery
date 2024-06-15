import * as services from '../services'
import { interalServerError, badRequest } from "../middlewares/handle_errors";
import { name, phone, password } from "../helper/join_schema";
import joi from "joi";

export const register_dri = async(req,res) =>{
    try {
        // const {name, phone, password} = req.body
        // const {error} = joi.object({ name, phone, password }).validate(req.body)
        // if(error) return badRequest(error.details[0]?.message, res)
        console.log(req.body)
        const response = await services.register_dri(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const login_dri = async(req,res) =>{
    try {
        const {error} = joi.object({ phone, password }).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res)
        const response = await services.login_dri(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const getDriver = async(req,res) => {
    try {
        const {id} = req.user
        const response = await services.getDriver(id)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const getAllDriver = async(req,res) => {
    try {
        const {id} = req.user
        const response = await services.getAllDriver(id)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const getUser = async(req,res) => {
    try {
        console.log(req.query)
        const response = await services.get_user(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const updateDriver = async(req,res) => {
    try {
        const response = await services.updateDriver(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const update_pass_dri = async (req, res) =>{
    try {
        const response = await services.update_pass_dri(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const refreshToken_dri = async (req, res) =>{
    try {
        const response = await services.refreshToken_dri(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}