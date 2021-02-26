const mongoose = require("mongoose");

//https://mongoosejs.com/docs/guide.html
const postSchema = new mongoose.Schema(
  {
    title: {
      //each types options: https://mongoosejs.com/docs/schematypes.html
      type: String,
      unique: true,
      trim: true,
      required: true,
      maxlength: 200,
    },
    desc: {
      type: String,
      trim: true,
      required: true,
      maxlength: 5000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
    ],
    mainPicPath: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      maxlength: 5000,
    },
    //at the time of before creating this post create like, comment and rate entery and collect their objectId
    like: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Like",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Comment",
    },
    rate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Rate",
    },
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    }],
    //seo: It is the search phrase that your users are most likely to look for
    focusKeyphrase: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    //seo: The meta description is an HTML meta tag that you can add to any page. Its purpose
    //is to provide a short description of your article for search engines and other crawlers.
    metaDesc: {
      type: String,
      trim: true,
      required: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
