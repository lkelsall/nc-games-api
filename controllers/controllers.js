const { selectCategories } = require("../models/models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.send({ categories: categories });
    })
    .catch(next);
};
