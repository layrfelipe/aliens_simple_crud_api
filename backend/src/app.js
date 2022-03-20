const express = require("express");
const mongoose = require("mongoose");

const url = "mongodb://localhost/AlienDBex";

const app = express();

app.use(express.json());

mongoose.connect(url, { useNewUrlParser: true });

const conn = mongoose.connection;

conn.on("open", () => {
    console.log("Connected...");
});

const alienRouter = require("./routers/aliens");
app.use("/aliens", alienRouter);

app.listen(3000, () => {
    console.log("Server started")
});