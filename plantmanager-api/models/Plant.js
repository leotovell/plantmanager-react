const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: false},
    comments: {type: [String], default: []},
    owner: {type: mongoose.Types.ObjectId, ref: "User", required: true},
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;