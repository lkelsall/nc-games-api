const express = require("express");
const {
  getCategories,
  getReviewById,
  patchReviewVotes,
} = require("./controllers/controllers");
const {
  handle500s,
  handle404s,
  psqlErrorHandler,
  customErrorHandler,
} = require("./error-handling");

const app = express();

// middleware
app.use(express.json());

// endpoint routing
app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReviewVotes);

// catch-all endpoint
app.use(handle404s);

// error handling middleware
app.use(customErrorHandler);
app.use(psqlErrorHandler);
app.use(handle500s);

module.exports = app;
