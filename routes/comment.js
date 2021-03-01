const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");

const {
  create,
  read,
  commentsByUser,
  update,
  remove,
  findCommentById,
} = require("../controllers/comment");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/comment/read/:commentId", read);
router.get("/comment/read/:userId", requireSignin, isAuth, commentsByUser);
router.post("/comment/create/:userId", requireSignin, isAuth, create);
router.put("/comment/:commentId/:userId", requireSignin, isAuth, update);
router.delete("/comment/:commentId/:userId", requireSignin, isAuth, remove);

router.param("commentId", findCommentById);
router.param("userId", userById);

module.exports = router;
