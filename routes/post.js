const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  create,
  read,
  update,
  remove,
  listAll,
  listByCategory,
  findPostById,
} = require("../controllers/post");

router.get("/post/read/:postId", read);
router.get("/posts", listAll);
router.get("/posts/:categoryId", listByCategory);
router.post("/post/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/post/:postId", requireSignin, isAuth, isAdmin, update);
router.delete("/post/:postId", requireSignin, isAuth, isAdmin, remove);

router.param("postId", findPostById);
router.param("userId", userById);

module.exports = router;
