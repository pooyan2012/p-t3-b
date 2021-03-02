const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    rater: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    score: { type: Number },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);
const SingleRate = mongoose.model("SingleRate", rateSchema);

//https://mongoosejs.com/docs/guide.html
const postRateSchema = new mongoose.Schema(
  {
    rates: [rateSchema],
  },
  { timestamps: true }
);
const Rate = mongoose.model("Rate", postRateSchema);

module.exports = { SingleRate, Rate };
