import * as services from "../services";
import { interalServerError, badRequest } from "../middlewares/handle_errors";
import { name, phone, password } from "../helper/join_schema";
import joi from "joi";
import { response } from "express";

export const register = async (req, res) => {
  try {
    // const {name, phone, password} = req.body
    // const {error} = joi.object({ name, phone, password }).validate(req.body)
    // if(error) return badRequest(error.details[0]?.message, res)
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = joi.object({ phone, password }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const getAll = async (req, res) => {
  try {
    const {id} = req.user
    const response = await services.getAll(id);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const response = await services.updateCustomer(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const update_pass_cus = async (req, res) => {
  try {
    const response = await services.update_pass_cus(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const response = await services.refreshToken(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
