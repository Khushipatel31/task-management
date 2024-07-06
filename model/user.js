const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const bcrypt = require("bcryptjs");//for encryption of password
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your Email"],
  },
  password: {
    type: String,
    required: true,
    select: false, //whenever find method is called
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

userSchema.pre("save", async function (next) {
  //password not modified then will go to next step
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);//10 characters password
})


//JWT generation and storing in cookie
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

//we use async await for using bcrypt
//enteredPassword=plainText and this.password=encrypted
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);

