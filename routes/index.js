var express = require("express");
var router = express.Router();
const categories_controller = require("../controllers/categoriesController");
const products_controller = require("../controllers/productsController");
const admin_controller = require("../controllers/adminController");
/* GET home page. */
router.get("/", products_controller.products_list);
router.get("/best-online-offers/:id", products_controller.product_details);
router.get("/categories/:id", categories_controller.index);
router.get("/categories/:id/:id", products_controller.product_details);
router.get("/admin", admin_controller.index);
router.get("/admin/create", admin_controller.product_create_get);
router.get("/admin/:id/update", admin_controller.product_update_get);

module.exports = router;
