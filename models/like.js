const mongoose = require("mongoose");

//https://mongoosejs.com/docs/guide.html
const likeSchema = new mongoose.Schema(
  {
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", likeSchema);
