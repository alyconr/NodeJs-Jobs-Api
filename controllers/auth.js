const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  const candidatePassword = req.body.password;

  const isMatch = await user.comparePassword(candidatePassword);

  if (!isMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email }); // find user by email and password combination in database

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const logout = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Not logged in");
  }
  
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(0),
  })
}

module.exports = {
  register,
  login,
  logout
};
