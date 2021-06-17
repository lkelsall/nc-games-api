const {
  getReviewById,
  patchReviewVotes,
  getReviews,
  getReviewComments,
} = require("../controllers/reviews");
const reviews = require("../db/data/test-data/reviews");
const reviewsRouter = require("express").Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:review_id", getReviewById);
reviewsRouter.patch("/:review_id", patchReviewVotes);
reviewsRouter.get("/:review_id/comments", getReviewComments);

module.exports = reviewsRouter;
