const formidable = require("formidable");
const _ = require("lodash"); //https://lodash.com
const Post = require("../models/post");
const { errorHandler } = require("../helpers/mongoDbErrorHandler");
const { apiHandler } = require("../helpers/internalApiCall");

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
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      ///////////////
      let cmID = await apiHandler(req.profile, "comment/create");
      let likeID = await apiHandler(req.profile, "like/create");
      let rateID = await apiHandler(req.profile, "rate/create");
      /*
      const data = "";
      const config = {
        method: "post",
        url:
          "http://localhost:8000/api/comment/create/60378b9084cc3dd9e4697fe4",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM3OGI5MDg0Y2MzZGQ5ZTQ2OTdmZTQiLCJfcm9sZSI6MSwiaWF0IjoxNjE0MzI3ODc1fQ.s2I6X98orDDsx7XhVYNPRt4vLnEI3CiEAHUU7A8ot1Q",
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          cmID = JSON.stringify(response.data._id);
          //return cmID;
        })
        .catch(function (error) {
          console.log(error);
        });*/
      ///////////////
      let userId = req.profile._id;

      console.log(`111=========> ${userId}+${cmID}+${likeID}+${rateID}`);
      //fields = { ...fields, userId, cmID, likeID, rateID };

      let {
        title,
        desc,
        categories,
        mainPicPath,
        //tags,
        focusKeyphrase,
        metaDesc,
      } = fields;

      let post = new Post({
        title,
        desc,
        author: userId,
        categories,
        mainPicPath,
        like: likeID,
        comment: cmID,
        rate: rateID,
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
