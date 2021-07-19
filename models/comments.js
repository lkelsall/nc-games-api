const db = require("../db/connection");

exports.updateComment = async (comment_id, reqBody) => {
  const { inc_votes } = reqBody;
  if (!inc_votes) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  const updateResult = await db.query(
    "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;",
    [inc_votes, comment_id]
  );
  if (updateResult.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
  return updateResult.rows[0];
};

exports.removeComment = async (comment_id) => {
  const deleteResult = await db.query(
    "DELETE FROM comments WHERE comment_id = $1 RETURNING *",
    [comment_id]
  );
  if (deleteResult.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
  return deleteResult.rows[0];
};
