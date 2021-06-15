const { selectReviewById, updateReviewVotes } = require("../models/reviews");

exports.getReviewById = (req, res, next) => {
  const reviewId = req.params.review_id;
  selectReviewById(reviewId)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch(next);
};

exports.patchReviewVotes = (req, res, next) => {
  const reviewId = req.params.review_id;
  updateReviewVotes(reviewId, req.body)
    .then((updatedReview) => {
      res.status(200).send({ review: updatedReview });
    })
    .catch(next);
};
