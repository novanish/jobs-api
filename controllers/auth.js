const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid credentials" });
  }

  const token = user.createJWT();
  return res.json({ user: { name: user.name }, token });
};

module.exports = {
  login,
  register,
};
