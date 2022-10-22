const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    maxLen: 255,
    minLen: 5,
    required: [true, "Заавал бөглөнө үү"],
  },
  body: {
    type: String,
    required: [true, "Заавал бөглөнө үү"],
  },
  coverImage: {
    type: String,
  },
  author: {
    type: Schema.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Post = model("Post", postSchema);
module.exports = Post;
