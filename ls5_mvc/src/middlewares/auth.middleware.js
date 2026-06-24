const authMiddleware = {
    authentication: (req, res, next) => {
        const token = req.body?.token

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }
        const [prefix, role, time] = token.split("_");

        if (prefix !== "MINDX") {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.body.userRole = role

        next();
    },
    authorization: (roleParam) => (req, res, next) => {
        const { userRole } = req.body
        if (!userRole) {
            return res.status(401).json({ message: "Role is required" });
        }
        if (userRole !== roleParam) {
            return res.status(401).json({ message: "Invalid role" });
        }

        next();
    }
}

export default authMiddleware;