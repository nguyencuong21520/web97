import Account from "../models/account.model.js";
import Customer from "../models/customer.model.js";
import Manager from "../models/manager.model.js";
import Employee from "../models/employee.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const authController = {
    register: async (req, res) => {
        try {
            const { email, password, role = "CUSTOMER" } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ message: "Missing email or password" });
            }

            const validRoles = ["MANAGER", "CUSTOMER", "EMPLOYEE"];
            if (!validRoles.includes(role.toUpperCase())) {
                return res.status(400).json({ message: "Invalid role. Role must be MANAGER, CUSTOMER, or EMPLOYEE" });
            }

            const normalizedEmail = email.toLowerCase().trim();
            const existingAccount = await Account.findOne({ email: normalizedEmail });
            if (existingAccount) {
                return res.status(400).json({ message: "An account with this email already exists" });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newAccount = await Account.create({
                email: normalizedEmail,
                password: hashedPassword,
                role: role.toUpperCase(),
                isActive: true
            });

            // Return account details excluding password
            const accountResponse = {
                _id: newAccount._id,
                email: newAccount.email,
                role: newAccount.role,
                isActive: newAccount.isActive,
                createdAt: newAccount.createdAt,
                updatedAt: newAccount.updatedAt
            };

            return res.status(201).json({
                message: "Account registered successfully",
                account: accountResponse
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Missing email or password" });
            }

            const normalizedEmail = email.toLowerCase().trim();
            const account = await Account.findOne({ email: normalizedEmail });
            if (!account) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            if (!account.isActive) {
                return res.status(403).json({ message: "Account is inactive" });
            }

            const isPasswordValid = await bcrypt.compare(password, account.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { userId: account._id, userRole: account.role },
                process.env.JWT_SECRET || "mindx_secret_key_2026",
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                message: "Login successfully",
                token
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            const { userId, userRole } = req.user;

            let profile = null;
            if (userRole === "CUSTOMER") {
                profile = await Customer.findOne({ accountId: userId }).populate("accountId", "email role isActive");
            } else if (userRole === "MANAGER") {
                profile = await Manager.findOne({ accountId: userId }).populate("accountId", "email role isActive");
            } else if (userRole === "EMPLOYEE") {
                profile = await Employee.findOne({ accountId: userId }).populate("accountId", "email role isActive");
            } else {
                return res.status(400).json({ message: "Invalid role in token" });
            }

            if (!profile) {
                return res.status(404).json({ message: `Profile not found for this ${userRole.toLowerCase()}` });
            }

            return res.status(200).json({
                message: "Get profile successfully",
                profile
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export default authController;
