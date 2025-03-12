const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: false,
        type: String,
    },
    authSource: {
        type: String,
        enum: ["self", "google"],
        default: "self",
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
