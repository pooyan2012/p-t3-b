const formidable = require("formidable");
const _ = require("lodash"); //https://lodash.com
const Post = require("../models/post");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");

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

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      //***************************************************** */
      //we need to create like, comment and rate for this post
      //we need to extend the fields and add like,comment and rate
      //***************************************************** */
      let post = new Post(fields);
      let {
        title,
        desc,
        author,
        categories,
        mainPicPath,
        tags,
        focusKeyphrase,
        metaDesc,
      } = fields;
      let photo = files.photo;

      // validations
      /* if (photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          });
        }

        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }*/

      if (
        !title ||
        !desc ||
        !author ||
        !categories ||
        !mainPicPath ||
        !tags ||
        !focusKeyphrase ||
        !metaDesc
      ) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      post.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          res.json(data);
        }
      });
    }
  });
};

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};

exports.listAll = (req, res) => {};

exports.listByCategory = (req, res) => {};
