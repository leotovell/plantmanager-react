const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        credentials: true,
    })
);
app.use(cookieParser());

const connectDB = require("./db");
connectDB();

// const r2Routes = require("./r2Routes");

// app.use("/api/r2", r2Routes);

const plantRoutes = require("./routes/plantRoutes");

app.use("/api/plants", plantRoutes);

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API ONLINE");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on localhost:" + PORT);
});

module.exports = app;
