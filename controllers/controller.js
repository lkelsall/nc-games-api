const {
  selectCategories,
  selectReviewById,
  updateReviewVotes,
} = require("../models/models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories: categories });
    })
    .catch(next);
};

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
