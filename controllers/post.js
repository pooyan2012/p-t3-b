const formidable = require("formidable");
const _ = require("lodash"); //https://lodash.com
const Post = require("../models/post");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");
const { apiHandler } = require("../helpers/internalApiCall");
var mongoose = require("mongoose");

exports.findPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("categories", "_id name") // this is the field name in category model | read more: https://mongoosejs.com/docs/populate.html#:~:text=The%20ref%20option%20is%20what,valid%20for%20use%20as%20refs.
    .populate("like", "_id")
    .populate("comment", "_id")
    .populate("rate", "_id")
    .exec((err, post) => {
      if (err || !post) {
        res.status(400).json({
          error: `Post with ID ${id} not found`,
        });
      } else {
        req.post = post;
      }

      next();
    });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        let cmID = await apiHandler(req.profile, "comment/create");
        let likeID = await apiHandler(req.profile, "like/create");
        let rateID = await apiHandler(req.profile, "rate/create");

        let userId = new mongoose.Types.ObjectId(req.profile._id);

        //console.log(`111=========> ${userId}+${cmID}+${likeID}+${rateID}`);

        let {
          title,
          desc,
          categories,
          mainPicPath,
          //tags,
          focusKeyphrase,
          metaDesc,
        } = fields;

        let categoriesArr = categories.split(",");

        categoriesArr = categoriesArr.map(
          (el) => new mongoose.Types.ObjectId(el)
        );
        let post = new Post({
          title,
          desc,
          author: mongoose.Types.ObjectId(userId),
          categories: categoriesArr,
          mainPicPath,
          like: mongoose.Types.ObjectId(likeID),
          comment: mongoose.Types.ObjectId(cmID),
          rate: mongoose.Types.ObjectId(rateID),
          //tags,
          focusKeyphrase,
          metaDesc,
        });

        console.log({
          title,
          desc,
          author: mongoose.Types.ObjectId(userId),
          categories: categoriesArr,
          mainPicPath,
          like: mongoose.Types.ObjectId(likeID),
          comment: mongoose.Types.ObjectId(cmID),
          rate: mongoose.Types.ObjectId(rateID),
          //tags,
          focusKeyphrase,
          metaDesc,
        });

        /*if (
        !title ||
        !desc ||
        !author ||
        !categories ||
        !mainPicPath ||
        !focusKeyphrase ||
        !metaDesc ||
        !comment ||
        !like ||
        !rate
      ) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }*/
        try {
          post.save((err, data) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              res.json(data);
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
};

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};

exports.listAll = (req, res) => {};

exports.listByCategory = (req, res) => {};
