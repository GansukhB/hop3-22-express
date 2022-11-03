const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Users");
const Post = require("./models/Post");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const middleware = require("./middlewares/authorization");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();
console.log(process.env);

app.use(express.json());
app.use(cors());
app.use(postRouter);
app.use(userRouter);

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {
  autoIndex: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully connected to MongoDB server");
});

app.get("/", middleware, async (req, res) => {
  const users = await User.find().lean(); // exec()
  res.send({
    data: users,
  });
});

app.app;

app;
//app.delete('/users', );

app.listen(3001, () => {
  console.log("web server is running on port 3000");
});
