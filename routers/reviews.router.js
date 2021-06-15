const { getReviewById, patchReviewVotes } = require("../controllers/reviews");
const reviewsRouter = require("express").Router();

reviewsRouter.get("/:review_id", getReviewById);
reviewsRouter.patch("/:review_id", patchReviewVotes);

module.exports = reviewsRouter;
