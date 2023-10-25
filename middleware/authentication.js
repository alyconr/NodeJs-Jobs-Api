const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1]; //  the second element of the array is the token
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // verify the token

    const { name, userId } = payload; // destructure the payload
    req.user = { name, userId }; // assign the payload to the req.user
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
