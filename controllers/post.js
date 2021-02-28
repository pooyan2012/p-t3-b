const Category = require("../models/category");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");

exports.findPostById = (req, res, next, id) => {
  Category.findById(id)
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

exports.create = (req, res) => {};

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};

exports.listAll = (req, res) => {};

exports.listByCategory = (req, res) => {};
