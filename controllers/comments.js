const { updateComment } = require("../models/comments");

exports.patchComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  updateComment(comment_id, req.body)
    .then((updatedComment) => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch(next);
};
