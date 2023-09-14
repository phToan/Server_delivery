import * as services from "../services";
import { interalServerError } from "../middlewares/handle_errors";


export const createSocket = async (req, res) => {
    try {
        const response = await services.createSocket(req.body)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const getSocket = async (req, res) => {
    try {
        const response = await services.getSocket(req.query)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const Socket = async (req, res) => {
    try {
        const response = await services.updateSocket(req.body)
        return res. status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}