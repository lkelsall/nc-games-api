const { updateComment, removeComment } = require("../models/comments");

exports.patchComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  updateComment(comment_id, req.body)
    .then((updatedComment) => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
