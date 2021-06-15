const {
  getReviewById,
  patchReviewVotes,
  getReviews,
} = require("../controllers/reviews");
const reviews = require("../db/data/test-data/reviews");
const reviewsRouter = require("express").Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:review_id", getReviewById);
reviewsRouter.patch("/:review_id", patchReviewVotes);

module.exports = reviewsRouter;
