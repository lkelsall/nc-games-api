const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const { getApi } = require("../controllers/api");
const apiRouter = require("express").Router();

apiRouter.get("/", getApi);

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
