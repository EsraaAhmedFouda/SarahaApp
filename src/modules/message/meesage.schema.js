import joi from "joi";
import { generalFeilds } from "../../middleware/validation.middleware.js";

export const messageSchema = joi.object().keys({
    message: joi.string().min(4).max(50000).required(),
    recipientId: generalFeilds.id.required(),
}).required().options({ allowUnknown: false });