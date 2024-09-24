const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "You must have a name"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "You must have an email"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please write a valid email"],
  },
  photo: String,
  password: {
    type: String,
    minlength: 8,
    require: [true, "You must have a password"],
    select: true,
  },
  passwordConfirmation: {
    type: String,
    require: [true, "Please provide password confirmation"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "The passwords are not match",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmation = undefined;
  next();
});
userSchema.methods.correctPassword = async (candidatePassword, password) => {
  return await bcrypt.compare(candidatePassword, password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
