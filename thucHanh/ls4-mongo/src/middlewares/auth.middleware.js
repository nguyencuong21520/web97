const authMiddleWare = {
    authen: (req, res, next) => {
        const token = req.headers?.authorization;
        if (!token) {
            return res.status(401).json({ message: "Missing token" });
        }
        const [signature, userId, userRole, time] = token.split('-');

        if (signature !== 'MINDX') {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = { userId, userRole };
        next();
    },
    authoz: (roleAccept) => (req, res, next) => {
        if (!roleAccept.includes(req.user.userRole)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        next();
    }
}

export default authMiddleWare