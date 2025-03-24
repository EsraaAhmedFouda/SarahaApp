import joi from "joi";
import { Types } from "mongoose";

//to check if id is valid to mongo in steadOf joi.string().hex.length(24).required()
export const validationObjectId = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message("invalid objectId");
}

export const generalFeilds = {
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ["com", "net"] } }).messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
        'string.min': 'Email should be at least 2 characters long',
    }),
    userName: joi.string().alphanum().min(2).max(20),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    confirmPassword: joi.string().valid(joi.ref("password")),
    phone: joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)),
    id: joi.string().custom(validationObjectId),
    'accepted-language': joi.string().valid('en', 'ar'),
    gender: joi.string().valid('male', 'female'),
}

export const validation = (schema) => {

    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };
        if (req.headers['accepted-language']) {
            data['accepted-language'] = req.headers['accepted-language'];
        }
        const result = schema.validate(data, { abortEarly: false });

        if (result.error) {
            return res.status(400).json({ message: 'validation error', errors });
        }
        return next()
    }
}


export const validation_custom = (schema) => {

    return (req, res, next) => {
        const errors = [];
        for (const key of Object.keys(schema)) {
            const result = schema[key].validate(req[key], { abortEarly: false });
            if (result.error) {
                errors.push({ key, error: result.error.details });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        return next()
    }
}