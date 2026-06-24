import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    role: String
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel;