const async = require("async");
const Products = require("../models/product");
const Category = require("../models/categories");
exports.index = function (req, res, next) {
  Products.find({}, "img name category").exec(function (err, products_list) {
    if (err) {
      return next(err);
    }
    res.render("admin", { products: products_list });
  });
};

exports.product_create_get = function (req, res, next) {
  Category.find({}, "name").exec(function (err, categories_list) {
    if (err) {
      return next(err);
    }
    res.render("product_form", { categories: categories_list });
  });
};

exports.product_create_post = [];

exports.product_update_get = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.find({}, "name").exec(callback);
      },
      product: function (callback) {
        Products.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("product_form", {
        product: results.product,
        categories: results.category,
      });
    }
  );
};
