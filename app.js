const express = require("express");
const cors = require("cors");
const apiRouter = require("./routers/api.router");
const {
  handle500s,
  handle404s,
  psqlErrorHandler,
  customErrorHandler,
} = require("./error-handling");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);
app.use(handle404s);

app.use(customErrorHandler);
app.use(psqlErrorHandler);
app.use(handle500s);

module.exports = app;
