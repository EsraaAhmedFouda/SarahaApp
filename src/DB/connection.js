import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URL).then(res => {
        console.log("Database Connected");

    }).catch(err => {
        console.log("Fail to connect with DB", err);

    })
}
export default connectDB;