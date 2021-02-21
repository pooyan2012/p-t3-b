const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controllers/user");
const { userSignUpValidator } = require("../validator");

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);

module.exports = router;
