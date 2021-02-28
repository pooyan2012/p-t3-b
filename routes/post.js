const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  listAll,
  listByCategory,
  findPostById,
} = require("../controllers/post");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/post/read/:postId", read);
router.get("/posts", listAll);
router.get("/posts/:categoryId", listByCategory);
router.post("/post/create", requireSignin, isAuth, isAdmin, create);
router.put("/post/:postId", requireSignin, isAuth, isAdmin, update);
router.delete("/post/:postId", requireSignin, isAuth, isAdmin, remove);

router.param("postId", findPostById);

module.exports = router;
