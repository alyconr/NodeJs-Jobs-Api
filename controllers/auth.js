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

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1]; //  the second element of the array is the token
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // verify the token
    const { name, userId } = payload; // destructure the payload
    req.user = { name, userId }; // assign the payload to the req.user
    res.status(StatusCodes.OK).json({ name, userId });
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }



   
}

module.exports = {
  register,
  login,
  logout
};
