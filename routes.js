const express = require("express");
const router = express.Router();
const { create } = require("./middleware/porductMiddle");
const {createSalesMidlle, createSalesMiddle} = require("./middleware/salesMiddle");
const { createProduct, getProduct, updateProduct, deleteProduct} = require("./controller/productController");
const {createSales, getSales, updatesales, deletesales}= require("./controller/salesController");

//@  /api/v1/product
router.route("/product").get(getProduct).post([create, createProduct]);
router.route("/product/:id").put([create, updateProduct]).delete(deleteProduct);

//@  /api/v1/salse
router.route("/sales").get(getSales).post([createSalesMiddle,createSales ]);
router.route("/sales/:id").put().delete(deletesales);

module.exports = router;
