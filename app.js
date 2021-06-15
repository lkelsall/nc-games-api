const express = require("express");
const { getCategories } = require("./controllers/controllers");
const { handle500s, handle404s } = require("./error-handling");

const app = express();

// middleware
app.use(express.json());

// endpoints
app.get("/api/categories", getCategories);

// catch-all endpoint
app.use(handle404s);

// error handling middleware
app.use(handle500s);

module.exports = app;
