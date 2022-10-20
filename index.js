const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Users");

app.use(express.json());

const MONGODB_URL = "mongodb://localhost:27017/express_db";

mongoose.connect(MONGODB_URL);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully connected to MongoDB server");
});

app.get("/", async (req, res) => {
  const users = await User.find().lean(); // exec()
  res.send({
    data: users,
  });
});

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username: username,
    email,
    password,
  });
  res.send({
    message: "User added",
  });
});

app.listen(3000, () => {
  console.log("web server is running on port 3000");
});