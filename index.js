const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Users");
const Post = require("./models/Post");
const cors = require("cors");

app.use(express.json());
app.use(cors());

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

app.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.send({
    data: posts,
  });
});
app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId).populate("author");
  res.send({
    data: post,
  });
});

app.post("/posts", async (req, res) => {
  const { title, body, coverImage, userId } = req.body;
  //if(title == ""){ res.send('title boglonuu')}
  try {
    const post = await Post.create({
      title,
      body,
      coverImage,
      author: userId,
    });
    res.send({
      message: "Post added",
    });
  } catch (e) {
    res.send({
      error: e,
    });
  }
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

app.put("/users", async (req, res) => {
  const { username, email, password, id } = req.body;
  const user = await User.findOne({ _id: id }).exec();
  let message;
  if (!user) {
    message = "User not found";
  } else {
    user.username = username;
    user.password = password;
    user.save();
    //user.delete()
    message = "Updated user info";
  }

  res.send({
    message,
  });
});
//app.delete('/users', );

app.listen(3001, () => {
  console.log("web server is running on port 3000");
});
