// load environment variables from env file
require("dotenv").config();

// assign port number
const port = process.env.PORT || 5000;

const app = require("./app");

// app set to listen
app.listen(port, () => console.log(`listening on port ${port}`));
