const productModel = require("../models/inventory");
const asyncHandler = require("express-async-handler");


//Get all products
const getProduct = async (req, res) => {
  const products = await productModel.find({});
  if (products) {
    res.status(200).json(products);
  }
};

//create a product
const createProduct = asyncHandler(async (req, res) => {
  const product = await productModel.create(req.body);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error("Duplicate value");
  }
});

//update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { params, body } = req;
  const product = await productModel.findOneAndUpdate(
    { _id: params.id },
    {
      $set: {
        name: body.name,
        count: body.count,
      },
    },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }

  res.status(200).json(product);
});


module.exports = {
  getProduct,
  createProduct,
  updateProduct
};
