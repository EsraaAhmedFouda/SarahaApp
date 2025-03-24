import connectDB from "./DB/connection.js"
import authController from "./modules/auth/auth.controller.js"
import userController from "./modules/user/user.controller.js"
import messageController from "./modules/message/message.controller.js"
import cors from "cors"
const bootstrap = (app, express) => {
    
    app.use(cors())
    app.use(express.json())//convert buffer data to json
    app.get('/', (req, res) => res.send('Hello World!'))

    app.use("/auth", authController);
    app.use("/user", userController);
    app.use("/message",messageController);
    app.all("*", (req, res) => {
        res.status(404).json({
            status: "fail",
            message: "Route not found"
        })
    })

    app.use((err, req, res, next) => {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    })

    connectDB();
}
export default bootstrap