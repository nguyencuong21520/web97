import User from "../models/user.model.js";


const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(404).json({ message: "Invalid credentials" });
            }

            const token = `MINDX-${user._id}-${user.role}-${Date.now().toString()}`

            return res.status(200).json({ message: "Login successfully", token });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    register: async (req, res) => {
        try {
            const { userName, password, email, role = "USER" } = req.body;
            if (!password || !email) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "A user with this email already exists" });
            }
            const newUser = await User.create({ userName, password, email, role });
            return res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
export default authController;