const {
  getReviewById,
  patchReviewVotes,
  getReviews,
  getReviewComments,
  postComment,
} = require("../controllers/reviews");
const reviews = require("../db/data/test-data/reviews");
const reviewsRouter = require("express").Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:review_id", getReviewById);
reviewsRouter.patch("/:review_id", patchReviewVotes);
reviewsRouter.get("/:review_id/comments", getReviewComments);
reviewsRouter.post("/:review_id/comments", postComment);

module.exports = reviewsRouter;
