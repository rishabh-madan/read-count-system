const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const ErrorHandler = require("./errorHandler");

const isUser = async (req, res, next) => {
  let token = req.headers.authorization;

  try {
    // if token is missing, throw error
    if (!token) throw new ErrorHandler(401, "unauthorized");

    token = token.split(" ")[1]; // remove "Bearer"

    // verify, decode token
    jwt.verify(token, keys.jwtSecret, (err, payload) => {
      // if token is invalid, throw error
      if (err) throw new ErrorHandler(401, "unauthorized");
      // else continue with populating user
      else {
        req.user = {
          _id: payload._id,
          username: payload.username,
        };
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = { isUser };
