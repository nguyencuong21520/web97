import UserModel from "../models/user.model.js";

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({
            message: "Login success",
            user,
            token: `MINDX_${user.role.toUpperCase()}_${Date.now() + 1000}`
        });

    },
    register: async (req, res) => {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = new UserModel({
            userName,
            email,
            password
        });
        await user.save();
        return res.json(user);
    }
}

export default authController
