const mongoose = require("mongoose");

//https://mongoosejs.com/docs/guide.html
const rateSchema = new mongoose.Schema(
  {
    rateInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rate", rateSchema);
