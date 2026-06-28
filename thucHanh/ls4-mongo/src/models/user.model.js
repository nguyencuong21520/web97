import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    email: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
export default User;