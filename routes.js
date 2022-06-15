const express = require("express");
const router = express.Router();
const { create } = require("./middleware/porductMiddle");
const { createProduct, getProduct, updateProduct, deleteProduct} = require("./controller/productController");

//@  /api/v1/product
router.route("/product").get(getProduct).post([create, createProduct]);

  router.route("/product/:id").put([create, updateProduct]).delete(deleteProduct);
//@  /api/v1/salse
router.route("/salse").get().post().put().delete();

module.exports = router;
