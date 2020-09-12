const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const path = require("path");

// init app
const app = express();

const registerRoutes = require("./routes");

const keys = require("./config/keys");

// body-parser by express
// parse application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(express.json());

// register db model
require("./models/User");

// db connection
mongoose.connect(
  keys.mongoUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("couldn't connect to db!");
      logger.error(err);
    } else console.log("connected to db");
  }
);

// register routes
registerRoutes(app);

// serve static folder (admin-panel)
app.use(express.static("client/build"));

// show admin panel (built react app)
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// error handler
app.use((error, req, res, next) => {
  let { statusCode, msg } = error;
  statusCode = statusCode || 500;

  if (statusCode == 500) {
    console.log(error);
    logger.error({
      route: req.baseUrl + req.path,
      query: req.query,
      body: req.body,
      user: req.user,
    });
  }

  res.status(statusCode).json({
    message: msg || "internal server error",
  });
});

module.exports = app;
