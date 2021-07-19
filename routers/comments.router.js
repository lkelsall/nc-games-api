const commentsRouter = require("express").Router();
const { patchComment } = require("../controllers/comments");

commentsRouter.patch("/:comment_id", patchComment);

module.exports = commentsRouter;
