const { getCategories } = require("../controllers/controller");
const categoriesRouter = require("express").Router();

categoriesRouter.get("/", getCategories);

module.exports = categoriesRouter;
