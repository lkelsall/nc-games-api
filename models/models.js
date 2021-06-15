const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.selectReviewById = async (reviewId) => {
  const reviewsResult = await db.query(
    "SELECT * FROM reviews WHERE review_id = $1",
    [reviewId]
  );
  const review = reviewsResult.rows[0];
  // throws 404 if requested review isn't found
  if (reviewsResult.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
  const commentsResult = await db.query(
    `SELECT * FROM comments WHERE review_id = ${review.review_id}`
  );
  const commentCount = commentsResult.rows.length;
  return { ...review, comment_count: commentCount };
};
