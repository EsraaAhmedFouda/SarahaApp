
import { model } from "mongoose";
import mongoose, { Schema } from "mongoose";

const messageScheme = mongoose.Schema({
    message: { type: String, minlength: 4, maxlenfth: 50000, required: true, trim: true },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
})

const messageModel = mongoose.models.Message|| mongoose.model("Message",messageScheme)

export default messageModel