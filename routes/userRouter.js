const express = require("express");
const User = require("../models/Users");
const middleware = require("../middlewares/authorization");
const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
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

userRouter.put("/users", async (req, res) => {
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

userRouter.post("/login", async (req, res) => {
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

module.exports = userRouter;
