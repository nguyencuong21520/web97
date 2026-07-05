import jwt from "jsonwebtoken";

const authMiddleWare = {
    authen: (req, res, next) => {
        let token = req.headers?.authorization;
        if (!token) {
            return res.status(401).json({ message: "Missing token" });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "mindx_secret_key_2026");
            req.user = { userId: decoded.userId, userRole: decoded.userRole };
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    },
    authoz: (roleAccept) => (req, res, next) => {
        if (!req.user || !roleAccept.includes(req.user.userRole)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        next();
    }
}

export default authMiddleWare;