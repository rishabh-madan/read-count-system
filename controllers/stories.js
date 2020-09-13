const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorHandler");
const Story = mongoose.model("stories");

module.exports = {
  async getListOfStories(req, res, next) {
    try {
      let docs = await Story.find().select("title");
      res.json({ message: "list of stories", payload: docs });
    } catch (error) {
      next(error);
    }
  },

  async getStory(req, res, next) {
    const storyId = req.params.id;
    try {
      let doc = await Story.findByIdAndUpdate(
        storyId,
        {
          $addToSet: { readers: req.user._id },
        },
        {
          new: true,
        }
      ).select("title content readers");

      if (!doc) throw new ErrorHandler(404, "story not found");

      res.json({
        message: "story data",
        payload: {
          totalReaderCount: doc.readers.length,
          _id: doc._id,
          title: doc.title,
          content: doc.content,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
