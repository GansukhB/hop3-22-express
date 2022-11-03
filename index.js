const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Users");
const Post = require("./models/Post");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const middleware = require("./middlewares/authorization");
const postRouter = require("./routes/postRouter");

require("dotenv").config();
console.log(process.env);

app.use(express.json());
app.use(cors());
app.use(postRouter);

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

app.post("/users", async (req, res) => {
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
