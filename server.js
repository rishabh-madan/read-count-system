// load environment variables from env file
require("dotenv").config();

// assign port number
const port = process.env.PORT || 5000;

const app = require("./app");

// app set to listen
const server = app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = { server };

require("./read-count-manager");
