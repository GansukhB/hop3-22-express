const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const app = express();
const User = require("./models/Users");
const Post = require("./models/Post");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const middleware = require("./middlewares/authorization");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();
console.log(process.env);
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(fileUpload());
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

app.post("/upload", async (req, res) => {
  if (!req.files) {
    res.send("No file");
  }
  const file = req.files.file;
  const uploadDir = __dirname + "/uploads/" + file.name;

  console.log(uploadDir);

  file.mv(uploadDir, function (err) {
    console.log(err);
    if (err) res.status(400).send("Error");

    res.send({
      message: "Uploaded",
      fileUrl: "http://localhost:3001/uploads/" + file.name,
    });
  });
});

app.listen(3001, () => {
  console.log("web server is running on port 3001");
});
