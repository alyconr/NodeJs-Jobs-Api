const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

userSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.getName = function () {
  return this.name;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
