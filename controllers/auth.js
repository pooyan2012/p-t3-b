const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for autorization check
const { errorHandler } = require("../helpers/mongoDbErrorHandler");

exports.signUp = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((e, user) => {
    if (e) {
      return res.status(400).json({
        err: errorHandler(e),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found. Please, signup",
      });
    } else {
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password doesn't match.",
        });
      }

      //generate a signed token with user id and secret
      const token = jwt.sign(
        { _id: user.id, _role: user.role },
        process.env.JWT_SECRET
      );
      //presist the token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      //return response with user and token to frontend client
      const { _id, name, email, role } = user;

      return res.json({
        token: token,
        user: {
          _id,
          email,
          name,
          role,
        },
      });
    }
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  //req.profile && req.auth && req.profile._id == req.auth._id; //auth is from userProperty: "auth" | it must be == instead of ===
  let user = req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth._role === 0 && !(req.auth._id == req.profile._id)) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }

  next();
};
