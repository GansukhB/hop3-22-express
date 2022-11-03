const express = require("express");
const Post = require("../models/Post");
const middleware = require("../middlewares/authorization");
const postRouter = express.Router();

postRouter.get("/posts", async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.per_page || 5;

  const offset = (page - 1) * perPage;

  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("author")
    .limit(perPage)
    .skip(offset);
  res.send({
    data: posts,
    page,
    perPage,
  });
});

postRouter.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId).populate("author");
  res.send({
    data: post,
  });
});

postRouter.post("/posts", middleware, async (req, res) => {
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

module.exports = postRouter;
