const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("API ONLINE");
});

app.listen(9000, () => {
    console.log("Server is running on localhost:9000");
});