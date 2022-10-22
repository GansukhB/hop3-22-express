const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profileImage: String,
});

const User = model("Users", userSchema);

module.exports = User;
