import userModel from '../../DB/model/User.model.js'
import { asyncHandler } from '../../utils/error/error.js'
import { successResponse } from '../../utils/response/success.response.js';
import { hashing } from '../../utils/security/hash.js'
import { encrypt } from "../../utils/security/encrypt.js";


export const signUp = asyncHandler(
    async (req, res) => {

        const { userName, email, password, confirmPassword, phone } = req.body;

        const checkUser = await userModel.findOne({ email: email })
        if (checkUser) {
            return next(new Error("Email Exist", { cause: 400 }));
        }
        const hashPassword = hashing({ plainText: password });
        const encryptPhone = encrypt({ plainText: phone });
        const user = userModel.create({ userName, email, password: hashPassword, confirmPassword: hashPassword, phone: encryptPhone })

        //to reduce time & space we sperated the confirmation email to another service
        eventEmitter.emit('SendConfirmEmail', { email })

        return successResponse({ res, message: "Done", status: 201 })
    });


//CONFIRM EMAIL
export const confirmEmail = asyncHandler(
    async (req, res) => {

        const { autherization } = req.headers;
        const decodded = verifyToken(autherization, process.env.EMAIL_JWT)
        const user = await userModel.findOneAndUpdate({ email: decodded.email }, { confirmEmail: true }, { new: true })
        return successResponse({ res, message: "Done", data: { user }, status: 201 })

    })


