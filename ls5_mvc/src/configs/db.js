import mongoose from "mongoose";


const CONNECTION_STRING = ""

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