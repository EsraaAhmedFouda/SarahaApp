import joi from 'joi';
import { generalFeilds } from '../../middleware/validation.middleware.js';

//schema is object bacause data that coming from user is json
export const signUpSchema = joi.object().keys({
    email: generalFeilds.email.required(),
        userName: generalFeilds.userName.required(),
        password: generalFeilds.password.required(),
        confirmPassword: generalFeilds.confirmPassword.valid(joi.ref("password")).required(),
        phone: generalFeilds.phone.required(),
       
        }).required().options({ allowUnknown: false })

export const signUpSchema_custom = {
    body: joi.object().keys({
        userName: joi.string().alphanum().min(2).max(20).required(),
        email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        confirmPassword: joi.string().valid(joi.ref("password")).required(),
        phone: joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)).required(),
    }).required().options({ allowUnknown: false }),

    params: joi.object().keys({ id: joi.boolean().required() }).required().options({ allowUnknown: false }),

    headers: joi.object().keys({ 'accepted-language': joi.string().valid('en', 'ar').required() }).required().options({ allowUnknown: true })

}


export const loginSchema = joi.object().keys({
    email: generalFeilds.email.required(),
    password: generalFeilds.password.required(),
}).required().options({ allowUnknown: false });