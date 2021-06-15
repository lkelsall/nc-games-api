const express = require("express");
const apiRouter = require("./routers/api.router");
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
app.use("/api", apiRouter);

// catch-all endpoint
app.use(handle404s);

// error handling middleware
app.use(customErrorHandler);
app.use(psqlErrorHandler);
app.use(handle500s);

module.exports = app;
