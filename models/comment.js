const mongoose = require("mongoose");

const singleCommentSchema = new mongoose.Schema(
  {
    commentDesc: {
      type: String,
      maxlength: 600,
      trim: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "SingleComment" },
    tumbUp: { type: number, default: 0 },
    tumbDown: { type: number, default: 0 },
  },
  { timestamps: true }
);

const SingleComment = mongoose.model("SingleComment", singleCommentSchema);

//https://mongoosejs.com/docs/guide.html
const postCommentsSchema = new mongoose.Schema(
  {
    comments: [singleCommentSchema], //array of objects
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", postCommentsSchema);

module.exports = { Comment, SingleComment };
