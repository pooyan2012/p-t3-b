const mongoose = require("mongoose");

//https://mongoosejs.com/docs/guide.html
const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
