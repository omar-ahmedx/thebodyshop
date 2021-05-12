const Categories = require("../models/categories");
const Products = require("../models/product");
const async = require("async");

exports.index = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Categories.find({ name: req.params.id }).exec(callback);
      },
      category_products: function (callback) {
        Products.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("categories", {
        category: results.category,
        category_products: results.category_products,
        title: `${req.params.id} - The body shop`,
      });
    }
  );
};
