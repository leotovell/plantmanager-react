const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: false},
    comments: {type: [String], default: []}
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;