const mongoose = require("mongoose");

//https://mongoosejs.com/docs/guide.html
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      maxlength: 32,
    },
    categoryParent: {
      //if this is sub category this feild must be filled
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
