import jwt from "jsonwebtoken";
import { EventEmitter } from "node:events";
import { sendMail } from "../email/send.email.js";
import { confirmEmailTemp } from "../email/confirmEmail.js";
export const eventEmitter = new EventEmitter();

eventEmitter.on('SendConfirmEmail', async ({ email }) => {
    const emailToken = generateToken({ email }, process.env.EMAIL_JWT)
    const emailLink = `${process.env.FE_URL}/confirm-email/${emailToken}`
    const html = confirmEmailTemp({link:emailLink})
    await sendMail({ email, subject: "Confirm Email", html })
})
