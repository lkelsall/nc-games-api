const db = require("../db/connection");

exports.selectReviewById = async (reviewId) => {
  const reviewsResult = await db.query(
    `SELECT reviews.*, COUNT(comment_id) AS comment_count 
      FROM reviews JOIN comments ON reviews.review_id = comments.review_id 
      WHERE reviews.review_id = $1 
      GROUP BY reviews.review_id`,
    [reviewId]
  );

  if (reviewsResult.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }

  return reviewsResult.rows[0];
};

exports.updateReviewVotes = async (reviewId, reqBody) => {
  const { inc_votes } = reqBody;
  if (!inc_votes) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  const updateResult = await db.query(
    "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *",
    [inc_votes, reviewId]
  );
  if (updateResult.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
  return updateResult.rows[0];
};

exports.selectReviews = () => {
  return db
    .query(
      `SELECT category, owner, title, reviews.review_id, review_img_url, reviews.created_at, reviews.votes, COUNT(comment_id) AS comment_count 
  FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id 
  GROUP BY reviews.review_id`
    )
    .then((result) => {
      return result.rows;
    });
};
