import jwt from "jsonwebtoken";
import userModel from "../DB/model/User.model.js";
import { asyncHandler } from "../utils/error/error.js";

export const authentication = asyncHandler(
async (req, res, next) => {

        const { autherizaton } = req.headers;
        if (!autherizaton) {
            return next(new Error("Missing Token !" ));
        }
        const [bearer, token] = autherizaton.split(" ");
        // can not determine the token is admin or user || do not leaf space bewteen bearer and token
        if (!bearer || !token) {
            return next(new Error("Not Valid Token !" ,{cause:400}));
        }

        //check if the token is belong to admin or user
        let SIGNITURE = ''
        switch (bearer) {
            case "admin":
                SIGNITURE = process.env.TOKEN_SIGNITURE_ADMIN;
                break;
            case "Bearer":
                SIGNITURE = process.env.TOKEN_SIGNITURE;
                break;
        }

        //ممكن لما جيت افك ال توكن ملقتش جواها id ودا لعدة اسباب انه ملعوب اصلا ف التوكن او اليوزر عمل فريز للاكونت قبل ميخلص الاكسبيرد تايم
        const decodded = jwt.verify(token, SIGNITURE)
        console.log(decodded);
        if (!decodded?.id) {
            return res.status(400).json({ message: "In-Valid data payload" })
        }
        const user = await userModel.findById(decodded.id)
        //user delete your account or admin make block to user but token still valid
        if (!user) {
            return res.status(400).json({ message: "not register account" })
        }
//to check time of create token if less than time of change pass => expired to token and relogin 
        if(user.changePasswordTme?.getTime()>=decodded.iat*1000){
            return next(new Error("invalid credentials",{cause:400}))
        }
        //add user to req object because we need it in profile 
        req.user = user
        return next();});


export const autherization =(accessRoles=[])=>{
    async(req, res, next) => {
        if(!accessRoles.includes(req.user.role)){
            return res.status(403).json({message:"Access Denied"});
        }
        return next();
     }
} 