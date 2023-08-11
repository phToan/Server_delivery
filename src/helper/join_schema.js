import joi from "joi";

export const phone = joi.string().pattern(new RegExp('^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$')).required()
export const password =  joi.string().min(8).required()
export const name = joi.string().min(6).required()
export const sender_phone = joi.string().pattern(new RegExp('^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$')).required()
export const receiver_phone = joi.string().pattern(new RegExp('^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$')).required()
