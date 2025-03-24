import { Router } from "express";
import { confirmEmail, signUp } from "./auth.services.js";
import { logIn } from "./login.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import { signUpSchema,loginSchema } from "./auth.schema.js";


const router = Router();


router.post("/signUp",validation(signUpSchema), signUp);
router.post("/logIn", validation(loginSchema),logIn);
router.patch("/confirm-email", confirmEmail);

export default router;