const {
  getReviewById,
  patchReviewVotes,
} = require("../controllers/controller");
const reviewsRouter = require("express").Router();

reviewsRouter.get("/:review_id", getReviewById);
reviewsRouter.patch("/:review_id", patchReviewVotes);

module.exports = reviewsRouter;
