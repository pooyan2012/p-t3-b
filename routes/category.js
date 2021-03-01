const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  create,
  read,
  list,
  update,
  remove,
  findCategoryById,
} = require("../controllers/category");

router.get("/category/read/:categoryId", read);
router.get("/categories", list);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.param("categoryId", findCategoryById);
router.param("userId", userById); //each time there is a userId in a route userById method run

module.exports = router;
