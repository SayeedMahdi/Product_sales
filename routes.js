const express = require("express");
const router = express.Router();
const { create } = require("./middleware/productMiddle");
const { createSalesMiddle} = require("./middleware/salesMiddle");
const { createProduct, getProduct, updateProduct} = require("./controller/productController");
const {createSales, getSales, updateSales, deleteSales}= require("./controller/salesController");

//@  /api/v1/product
router.route("/product").get(getProduct).post([create, createProduct]);
router.route("/product/:id").put([create, updateProduct]);

//@  /api/v1/sales
router.route("/sales").get(getSales).post([createSalesMiddle,createSales ]);
router.route("/sales/:id").put(updateSales).delete(deleteSales);
// router.route("/sales:id").delete(deleteSales)

module.exports = router;
