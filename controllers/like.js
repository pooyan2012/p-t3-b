const Like = require("../models/like");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");

exports.findLikeById = (req, res) => {};

exports.create = (req, res) => {
  const like = new Like(req.body); //req.body holds parameters that are sent up from the client as part of a POST request
  like.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json(data);
    }
  });
};

exports.read = (req, res) => {};
exports.update = (req, res) => {};
exports.remove = (req, res) => {};
exports.likesByUser = (req, res) => {};
