const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

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
  const selectResult = await db.query(
    "SELECT * FROM reviews WHERE review_id = $1",
    [reviewId]
  );
  if (selectResult.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
  const currentVotes = selectResult.rows[0].votes;
  const incrementedVotes = currentVotes + inc_votes;
  const updateResult = await db.query(
    "UPDATE reviews SET votes = $1 WHERE review_id = $2 RETURNING *",
    [incrementedVotes, reviewId]
  );
  return updateResult.rows[0];
};
