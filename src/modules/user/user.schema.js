import joi from "joi";
import { generalFeilds } from "../../middleware/validation.middleware.js";

export const share = joi.object().keys({
    userId : generalFeilds.id.required()
    }).required();
    

export const Profile = joi.object().keys({
userName:generalFeilds.userName,
gender:generalFeilds.gender,
phone: generalFeilds.phone,
DOB:joi.date().less("now")
}).required();



export const Password = joi.object().keys({
oldPassword : generalFeilds.password.required(),
password:generalFeilds.password.not(joi.ref("oldPassword")).required(),
confirmPassword:generalFeilds.confirmPassword.valid(joi.ref("password")).required(),
}).required();