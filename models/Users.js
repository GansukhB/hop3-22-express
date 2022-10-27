const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username бөглөнө үү"],
    minLength: [2, "2 тэмдэгтээс багагүй байх"],
    maxLength: [100, "100 тэмдэгтээс хэтрэхгүй"],
  },
  email: {
    type: String,
    minLength: [2, "2 тэмдэгтээс багагүй байх"],
    maxLength: [100, "100 тэмдэгтээс хэтрэхгүй"],
    index: {
      unique: true,
    },
  },
  password: String,
  profileImage: String,
});

userSchema.path("email").validate((email) => {
  return email.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}, "Email хаяг буруу байна");

const User = model("Users", userSchema);

module.exports = User;
