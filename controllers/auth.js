const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");
const keys = require("../config/keys");

const User = mongoose.model("users");

module.exports = {
  async signUp(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      // validate request
      if (!username || !password)
        throw new ErrorHandler(400, "username & password are required");

      let user = await User.findOne({ username }).select("_id");

      // check for existing username
      if (user) throw new ErrorHandler(409, "username is already registered");
      // else, proceed with signup
      else {
        // encrypt the password
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) throw err;

          // save user to db
          let user = await User.create({ username, password: hash });

          let payload = {
            _id: user._id,
            username: user.username,
          };

          // generate token
          let token = jwt.sign(payload, keys.jwtSecret);

          // send token in response
          return res.status(200).json({
            message: "user registered successfully",
            payload: {
              ...payload,
              token,
            },
          });
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      // validate request
      if (!username || !password)
        throw new ErrorHandler(400, "username & password are required");

      // get user's password from db
      let user = await User.findOne({ username }).select("username password");

      // if user doesn't exist, throw error
      if (!user) throw new ErrorHandler(404, "user not found");

      // match passwords
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // handle case of incorrect credentials
        throw new ErrorHandler(400, "incorrect password");
      } else {
        // if credentials match
        let payload = {
          _id: user._id,
          username: user.username,
        };
        // generate jwt token
        let token = jwt.sign(payload, keys.jwtSecret);

        // send token in response
        return res.status(200).json({
          message: "user logged in successfully",
          payload: {
            ...payload,
            token,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
