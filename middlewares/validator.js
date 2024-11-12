import Joi from "joi";

const authSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(3).max(20).required()
})

export default authSchema