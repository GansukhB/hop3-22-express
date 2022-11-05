const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      maxLength: 255,
      minLength: 5,
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
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
module.exports = Post;
