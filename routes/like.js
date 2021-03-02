const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  create,likeIt,
  read,
  likesByUser,
  update,
  remove,
  findLikeById,
} = require("../controllers/like");

router.get("/like/read/:likeId", read);
router.get("/like/read/:userId", requireSignin, isAuth, likesByUser);
router.post("/like/create/:userId", requireSignin, isAuth,isAdmin, create);
router.post("/like/leavelike/:userId", requireSignin, isAuth, likeIt);
router.put("/like/:likeId/:userId", requireSignin, isAuth, update);
router.delete("/like/:likeId/:userId", requireSignin, isAuth, remove);

router.param("likeId", findLikeById);
router.param("userId", userById);

module.exports = router;
