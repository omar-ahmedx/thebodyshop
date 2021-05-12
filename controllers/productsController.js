const Products = require("../models/product");

exports.products_list = function (req, res, next) {
  Products.find({}).exec(function (err, products) {
    if (err) {
      return next(err);
    }
    res.render("index", { title: "The Body Shop", face_products: products });
  });
};

exports.product_details = function (req, res, next) {
  Products.findById(req.params.id).exec(function (err, product_details) {
    if (err) {
      return next(err);
    }
    res.render("product_detail", {
      product: product_details,
      title: product_details.name,
    });
  });
};
