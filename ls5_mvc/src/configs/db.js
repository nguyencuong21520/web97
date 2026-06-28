import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const CONNECTION_STRING = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;