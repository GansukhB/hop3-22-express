const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Users");
const Post = require("./models/Post");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
console.log(process.env);

app.use(express.json());
app.use(cors());

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {
  autoIndex: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully connected to MongoDB server");
});

const middleware = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      console.log(err);
      res.send("Login invalid");
      return;
    }
    console.log(decoded);
    res.locals.userId = decoded.data._id;
    next();
  });
  // yarn add jsonwebtoken
  // if (!user) {
  //   res.send("You should login");
  // }
  //console.log(req.body, req.query, "this is middleware");
  // next();
};

app.get("/", middleware, async (req, res) => {
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

app.post("/posts", middleware, async (req, res) => {
  const { title, body, coverImage, userId } = req.body;
  //if(title == ""){ res.send('title boglonuu')}
  console.log(res.locals.userId);
  try {
    const post = await Post.create({
      title,
      body,
      coverImage,
      author: res.locals.userId,
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

app.post("/users", middleware, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      email,
      password,
    });
    res.send({
      message: "User added",
    });
  } catch (e) {
    res.send(e);
  }
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: password,
  }).lean();
  if (user) {
    token = jwt.sign(
      {
        data: user,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    res.send({
      token: token,
    });
  }
  res.send({
    message: "Invalid credential",
  });
});
//app.delete('/users', );

app.listen(3001, () => {
  console.log("web server is running on port 3000");
});
