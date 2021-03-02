const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  create,
  createSingleCM,
  read,
  commentsByUser,
  update,
  remove,
  findCommentById,
} = require("../controllers/comment");

router.get("/comment/read/:commentId", read);
router.get("/comment/read/:userId", requireSignin, isAuth, commentsByUser);
router.post("/comment/create/:userId", requireSignin, isAuth, isAdmin, create); //for creating comment template for a new post
router.post("/comment/leavecm/:userId", requireSignin, isAuth, createSingleCM); //for leaving comment from user
router.put("/comment/:commentId/:userId", requireSignin, isAuth, update);
router.delete("/comment/:commentId/:userId", requireSignin, isAuth, remove);

router.param("commentId", findCommentById);
router.param("userId", userById);

module.exports = router;
