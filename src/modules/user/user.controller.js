import { Router } from "express";
import { freezeProfile, profile, shareProfile, updatePassword, updateProfile } from './user.services.js'
import { authentication } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { Password, Profile, share } from "./user.schema.js";

const router = Router();

router.get("/profile", authentication, profile)

router.get("/share/:userId",validation(share),authentication, shareProfile)

router.patch(
    "/updateProfile",
    validation(Profile),
    authentication
    , updateProfile)

router.patch(
    "/password",
    validation(Password),
    authentication
    , updatePassword)

router.delete(
    "/freezeAccount",
    authentication
    , freezeProfile)
    

export default router;