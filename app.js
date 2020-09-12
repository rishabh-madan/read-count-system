const express = require("express");

// init app
const app = express();

// body-parser by express
// parse application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("server is running!");
});

module.exports = app;
