const router = require("express").Router();
const controller = require("../controllers/stories");
const auth = require("../utils/authCheck");

// DESCRIPTION:     get list of stories (titles)
// ACCESS:          user
router.get("/", auth.isUser, controller.getListOfStories);

// DESCRIPTION:     get story details
// ACCESS:          user
router.get("/:id", auth.isUser, controller.getStory);

module.exports = router;
