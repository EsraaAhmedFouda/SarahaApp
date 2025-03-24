import { model } from "mongoose";
import mongoose, { Schema } from "mongoose";

const userShema = new Schema({
    userName: {
        type: String,
        minlength: 2,
        maxlength: 25,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    DOB: Date,
    address: String,
    phone: String,
    image: String,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "User",
        enum: ["Admin", "User"]
    },
    changePasswordTme:Date,
    isDeleted:{type:Boolean,default:false}
}, { timestamps: true });

const userModel = mongoose.models.User || model("User", userShema);
export default userModel;