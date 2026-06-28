import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
        process.exit(1)
    }
}
export default connectDB