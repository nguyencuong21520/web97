import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const userInfo = {
            userId: user._id,
            role: user.role,
        }

        const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.json({
            message: "Login success",
            user,
            token
        });

    },
    register: async (req, res) => {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const user = new UserModel({
            userName,
            email,
            password: hashPassword,
            salt
        });
        await user.save();
        return res.json(user);
    }
}

export default authController
