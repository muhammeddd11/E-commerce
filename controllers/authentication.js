const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
};
exports.register = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    });
    res.status(200).json({
      status: "success",
      message: "Your account has been created",
      token: createToken(newUser._id),
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: "Please register again",
    });
    console.log(err);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide the email or the password",
    });
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (
    !user ||
    !(await user.correctPassword(req.body.password, user.password))
  ) {
    return res.status(501).json({
      status: "fail",
      message: "Please re-login",
    });
  }

  res.status(200).json({
    status: "success",
    message: "you are logged in",
    token: createToken(user._id),
  });
};
