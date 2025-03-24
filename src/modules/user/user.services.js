
import { asyncHandler } from '../../utils/error/error.js'
import { decrypt } from '../../utils/security/decrypt.js';
import userModel from '../../DB/model/User.model.js';
import { compareHash } from '../../utils/security/compare.js';
import { hashing } from '../../utils/security/hash.js';

export const profile = asyncHandler(async (req, res) => {
       req.user.phone = decrypt({ sipherText: req.user.phone })
       //لو عاوزه اعرف بيانات صاحب الرساله
       const messages = await userModel.find({ recipientId: req.user._id, isDeleted: false }).populate(
              {
                     path: "recipientId",
                     select: "userName email"
              }
       )
       return successResponse({ res, data: req.user,messages, status: 201 })

});

export const shareProfile = asyncHandler(async (req, res) => {
       const user = await userModel.findOne({ _id: req.params.userId, isDeleted: false })
       return user ? successResponse({ res, message: "Done", data: user, status: 201 }) : next(new Error("invalid User", { cause: 400 }))

});

export const updateProfile = asyncHandler(
       async (req, res, next) => {
              const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
              return successResponse({ res, message: "Updated Successfully", data: user, status: 201 })

       });


export const updatePassword = asyncHandler(
       async (req, res, next) => {
              const { password, oldPassword } = req.body;
              if (!compareHash({ plainText: oldPassword, hashValue: req.user.password })) {
                     return next(new Error("In valid old password"), { cause: 409 })
              }
              const hashPassword = hashing({ plainText: password })

              const user = await userModel.findByIdAndUpdate(req.user._id, { password: hashPassword, changePasswordTme: Date.now() }, { new: true, runValidators: true })
              return successResponse({ res, message: "Updated password Successfully", data: user, status: 201 })

       });

export const freezeProfile = asyncHandler(
       async (req, res, next) => {

              const user = await userModel.findByIdAndUpdate(req.user._id, { isDeleted: true }, { new: true, runValidators: true })
              return successResponse({ res, message: "Frreze Account Successfully", data: user, status: 201 })

       });