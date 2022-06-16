const salesModel = require("../models/salles");
const producModel = require("../models/inventory");
const asyncHandler = require("express-async-handler");


//Get all tts
const getSales = async (req, res) => {
  const sales = await salesModel.find({});
  if (sales) {
    res.status(200).json(sales);
  }
};

//creat a sales
const createSales = asyncHandler(async (req, res) => {
    const productId = req.body.productId;
    const salesAmount = req.body.salesAmount;

    const productContaint = await producModel.findById({_id: productId});
    validateProductCount(productContaint, salesAmount)

    
    const productDiscount = await producModel.findByIdAndUpdate({_id:productId}, {$inc:{"productCount":-salesAmount}});
    const sales = await salesModel.create(req.body);
    if (sales && productDiscount) {
      res.status(201).json(sales);
    } else {
      res.status(404);
      throw new Error("Duplicate value");
    }
});

const validateProductCount = (productContaint,salesAmount) => {
    if (productContaint.productCount < salesAmount) {
        res.status(404)
        throw new Error("There is not enough Product in Grocery!");
    }
}

//update a sales
const updatesales = asyncHandler(async (req, res) => {
  const { params, body } = req;
  const sales = await producModel.findOneAndUpdate(
    { _id: params.id },
    {
      $set: {
        salesName: body.salesName,
        salesCount: body.salesCount,
      },
    },
    { new: true }
  );
  if (!sales) {
    res.status(404);
    throw new Error("sales not found");
  }

  res.status(201).json(sales);
});

//delete sales
const deletesales = asyncHandler(async (req,res) => {
    const {params} = req;
    const sales = await producModel.findOneAndDelete(
        { _id: params.id }
      );
      if (!sales) {
        res.status(404);
        throw new Error("sales not found");
      }
      res.status(200).json(sales)
})
module.exports = {
  getSales,
  createSales,
  updatesales,
  deletesales
};
