const mongoose = require("mongoose");
const crypto = require("crypto");
const {v4: uuidv4} = require('uuid');

//https://mongoosejs.com/docs/guide.html
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    ///////////////////
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//virtual field
//https://mongoosejs.com/docs/tutorials/virtuals.html
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
};

module.exports = mongoose.model("User", userSchema);
