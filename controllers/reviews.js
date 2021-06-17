const {
  selectReviewById,
  updateReviewVotes,
  selectReviews,
  selectComments,
} = require("../models/reviews");

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

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews: reviews });
    })
    .catch(next);
};

exports.getReviewComments = (req, res, next) => {
  const reviewId = req.params.review_id;
  selectComments(reviewId)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};
