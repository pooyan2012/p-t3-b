const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  create,
  read,
  ratesByUser,
  update,
  remove,
  findRateById,
} = require("../controllers/rate");

router.get("/rate/read/:rateId", read);
router.get("/rate/read/:userId", requireSignin, isAuth, ratesByUser);
router.post("/rate/create/:userId", requireSignin, isAuth, create);
router.put("/rate/:rateId/:userId", requireSignin, isAuth, update);
router.delete("/rate/:rateId/:userId", requireSignin, isAuth, remove);

router.param("rateId", findRateById);
router.param("userId", userById);

module.exports = router;
