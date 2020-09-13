module.exports = function (app) {
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/stories", require("./api/stories"));
};
