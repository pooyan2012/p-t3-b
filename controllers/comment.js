const Comment = require("../models/comment");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");

exports.findCommentById = (req, res) => {};

exports.create = (req, res) => {
  const comment = new Comment(req.body); //req.body holds parameters that are sent up from the client as part of a POST request
  comment.save((err, data) => {
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
exports.commentsByUser = (req, res) => {};
