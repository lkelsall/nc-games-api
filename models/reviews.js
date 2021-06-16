const db = require("../db/connection");

exports.selectReviewById = async (reviewId) => {
  const reviewsResult = await db.query(
    `SELECT reviews.*, COUNT(comment_id) AS comment_count 
      FROM reviews JOIN comments ON reviews.review_id = comments.review_id 
      WHERE reviews.review_id = $1 
      GROUP BY reviews.review_id;`,
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
    "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
    [inc_votes, reviewId]
  );
  if (updateResult.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
  return updateResult.rows[0];
};

exports.selectReviews = (sort_by = "created_at", order = "DESC", category) => {
  const validColumns = [
    "owner",
    "title",
    "review_id",
    "category",
    "created_at",
    "votes",
    "comment_count",
  ];
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  if (!["ASC", "DESC"].includes(order.toUpperCase())) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  const query = {};
  query.text = `SELECT category, owner, title, reviews.review_id, review_img_url, reviews.created_at, reviews.votes, COUNT(comment_id) AS comment_count 
  FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id`;
  if (category) {
    query.text += ` WHERE category = $1`;
    query.values = [category];
  }
  query.text += `  GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`;

  return db.query(query).then((result) => {
    return result.rows;
  });
};
