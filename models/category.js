const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
