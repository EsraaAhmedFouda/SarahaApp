import { compareHash } from '../../utils/security/compare.js'
import userModel from '../../DB/model/User.model.js'
import { asyncHandler } from '../../utils/error/error.js'
import { successResponse } from '../../utils/response/success.response.js';
import { generateToken } from '../../utils/security/token.js';



export const logIn = asyncHandler(
    async (req, res) => {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return next(new Error("Email not Exist", { cause: 400 }));
        }
        if (!user.confirmEmail) {
            return next(new Error("please confirm your email frist", { cause: 400 }));
        }
        const match = compareHash({ plainText: password, hashValue: user.password });
        if (!match) {
            return next(new Error("Password not match", { cause: 400 }));
        }
        const token = generateToken({
            payload: { id: user._id, isLoggedIn: true },
            signature: user?.role == "admin" ? process.env.TOKEN_SIGNITURE_ADMIN : process.env.TOKEN_SIGNITURE,
            options: { expired: 10 * 60 }
        })
        return successResponse({ res, message: "log in sucessfully", data: { user }, status: 201 })

    })