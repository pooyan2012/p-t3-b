const express = require("express");
const router = express.Router();

const {
  create,
  read,
  list,
  update,
  remove,
  findCategoryById,
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/category/read/:categoryId", read);
router.get("/categories", list);
router.post("/category/create", requireSignin, isAuth, isAdmin, create);
router.put("/category/:categoryId", requireSignin, isAuth, isAdmin, update);
router.delete("/category/:categoryId", requireSignin, isAuth, isAdmin, remove);

router.param("categoryId", findCategoryById);

module.exports = router;
