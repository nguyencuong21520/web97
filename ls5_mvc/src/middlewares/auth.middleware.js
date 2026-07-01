import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = {
    authentication: (req, res, next) => {
        try {
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token is required" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userInfo = {
                userId: decoded.userId,
                role: decoded.role,
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: error.message || "Invalid token" });
        }
    },
    authorization: (roleParam) => (req, res, next) => {
        const { role } = req.userInfo
        if (!role) {
            return res.status(401).json({ message: "Role is required" });
        }
        if (role !== roleParam) {
            return res.status(401).json({ message: "Invalid role" });
        }

        next();
    }
}

export default authMiddleware;