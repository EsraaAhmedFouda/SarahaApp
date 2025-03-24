import { Route } from "express";
import  {validation}  from "../../middleware/validation.middleware.js";
import { messageSchema } from "./message.schema.js";
import { sendMessage } from "./message.services.js";
const router = Route();

router.post("/sendMessage", 
    validation(messageSchema),
    sendMessage
);

export default router;