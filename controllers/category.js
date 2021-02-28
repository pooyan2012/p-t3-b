const Category = require("../models/category");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");

exports.findCategoryById = (req, res, next, id) => {
  Category.findById(id)
    .populate("categoryParent", '_id name') // this is the field name in category model | read more: https://mongoosejs.com/docs/populate.html#:~:text=The%20ref%20option%20is%20what,valid%20for%20use%20as%20refs.
    .exec((err, category) => {
      if (err || !category) {
        res.status(400).json({
          error: `Category with ID ${id} not found`,
        });
      } else {
        req.category = category;
      }

      next();
    });
};

exports.create = (req, res) => {
  const category = new Category(req.body); //req.body holds parameters that are sent up from the client as part of a POST request
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json(data);
    }
  });
};

exports.read = (req, res) => {
  let category = req.category;

  if (category) {
    return res.json({
      category,
    });
  }
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      res.status(400).json(data);
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res) => {
  var category = req.category;

  category.name = req.body.name;

  category.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json(data);
    }
  });
};

exports.remove = (req, res) => {
  var category = req.category;

  category.remove((err, deleteCategory) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    } else {
      res.json({
        message: "Category successfully deleted",
      });
    }
  });
};
