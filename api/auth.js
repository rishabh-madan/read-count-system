const router = require("express").Router();
const controller = require("../controllers/auth");

// DESCRIPTION:     user signup
// ACCESS:          public
router.post("/signup", controller.signUp);

// DESCRIPTION:     user login
// ACCESS:          public
router.post("/login", controller.login);

module.exports = router;
