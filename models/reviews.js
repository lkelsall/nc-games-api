const e = require("express");
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

exports.selectReviews = async (
  sort_by = "created_at",
  order = "DESC",
  category
) => {
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

  const reviewsRes = await db.query(query);

  if (reviewsRes.rows.length === 0) {
    const categoryResult = await db.query(
      "SELECT * FROM categories WHERE slug = $1",
      [category]
    );
    if (categoryResult.rows.length === 0) {
      return Promise.reject({ status: 400, msg: "bad request" });
    } else {
      return Promise.reject({ status: 404, msg: "not found" });
    }
  } else {
    return reviewsRes.rows;
  }
};

exports.selectComments = async (reviewId) => {
  const commentsRes = await db.query(
    "SELECT comment_id, votes, created_at, author, body FROM comments WHERE review_id = $1",
    [reviewId]
  );

  if (commentsRes.rows.length === 0) {
    await exports.selectReviewById(reviewId);
  }

  return commentsRes.rows;
};

exports.insertComment = async (reviewId, username, commentBody) => {
  // this handles the cases where there is no username or body, and also those where these values are of the wrong type
  // (SQL seems to accept INTs in place of VARCHARs, but not text in place of INTs)
  if (typeof username !== "string") {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  if (typeof commentBody !== "string") {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  const insertRes = await db.query(
    "INSERT INTO comments (author, review_id, body) VALUES ($1, $2, $3) RETURNING *;",
    [username, reviewId, commentBody]
  );
  return insertRes.rows[0];
};
