import * as services from "../services";
import { interalServerError, badRequest } from "../middlewares/handle_errors";
import { sender_phone, receiver_phone } from "../helper/join_schema";
import Joi from "joi";

export const createOrder = async (req, res) => {
    try {
        // const {error} = Joi.object({sender_phone, receiver_phone}).validate(req.body)
        // if(error) return badRequest(error.details[0].message, res)
        const response = await services.createOrder(req.body)
        // console.log(req.body)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
} 

export const create_Order_dri = async (req, res) => {
    try {
        // const {error} = Joi.object({sender_phone, receiver_phone}).validate(req.body)
        // if(error) return badRequest(error.details[0].message, res)
        const response = await services.create_Order_dri(req.body)
        // console.log(req.body)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
} 

export const getOrder = async (req, res) => {
    try {
        const response = await services.getOrder(req.query)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
} 

export const deleteOrder = async (req, res) => {
    try {
        const response = await services.deleteOrder(req.body)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
} 

export const get_Order_dri = async (req, res) => {
    try {
        const response = await services.get_Order_dri(req.query)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
} 

export const delete_Order_dri = async (req, res) => {
    try {
        const response = await services.delete_Order_dri(req.body)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
} 