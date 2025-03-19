const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorised, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({message: "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: invalid token" });
    }
};

module.exports = authMiddleware;
