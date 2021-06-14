const express = require("express");
const { getCategories } = require("./controllers/controllers");

const app = express();

app.get("/api/categories", getCategories);

app.use((err, req, res, next) => {
  res.status(500).send({ message: "Internal server error" });
});

module.exports = app;
