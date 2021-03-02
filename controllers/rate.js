const { SingleRate, Rate } = require("../models/rate");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");

exports.findRateById = (req, res) => {};

exports.create = (req, res) => {
  const rate = new Rate(req.body); //req.body holds parameters that are sent up from the client as part of a POST request
  rate.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json(data);
    }
  });
};

exports.createSingleRate = (req, res) => {};

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};

exports.ratesByUser = (req, res) => {};
