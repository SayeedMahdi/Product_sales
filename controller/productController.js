const productModel = require("../models/inventory");
const asyncHandler = require("express-async-handler");


//Get all products
const getProduct = async (req, res) => {
  const products = await productModel.find({});
  if (products) {
    res.status(200).json(products);
  }
};

//creat a product
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
        productName: body.productName,
        productCount: body.productCount,
      },
    },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }

  res.status(201).json(product);
});

//delete product
const deleteProduct = asyncHandler(async (req,res) => {
    const {params} = req;
    const product = await productModel.findOneAndDelete(
        { _id: params.id }
      );
      if (!product) {
        res.status(404);
        throw new Error("product not found");
      }
      res.status(200).json(product)
})
module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
