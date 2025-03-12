const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const connectDatabase = require("../db");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

router.use(cookieParser());
router.use(express.json());
connectDatabase();

router.post("/google-auth", async (req, res) => {
    const { credential, client_id } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, given_name, family_name } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
                name: `${given_name} ${family_name}`,
                authSource: "google",
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600000,
            })
            .json({ message: "Auth successful", user });
    } catch (error) {
        console.error("Error during google auth: ", error);
        res.status(400).json({ error });
    }
});

router.get("/check", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ isAuthenticated: false });

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ isAuthenticated: true });
    } catch (error) {
        res.json({ isAuthenticated: false });
    }
});

module.exports = router;
