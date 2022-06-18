const salesModel = require("../models/salles");
const producModel = require("../models/inventory");
const asyncHandler = require("express-async-handler");


//Get all tts
const getSales = asyncHandler( async (req, res) => {
  const sales = await salesModel.find({}).populate({path:"productId"});
  if (sales) {
    res.status(200).json(sales);
  }
});

//creat a sales
const createSales = asyncHandler(async (req, res) => {
    const productId = req.body.productId;
    const salesAmount = req.body.salesAmount;
    const productContaint = await producModel.findById({_id: productId});
    validateProductCount(productContaint, salesAmount,res)

     const productDiscount = await producModel.findByIdAndUpdate({_id:productId}, {$inc:{"productCount":-salesAmount}});
  
    const sales = await salesModel.create(req.body);
    if (sales && productDiscount) {
      res.status(201).json(sales);
    } else {
      res.status(404);
      throw new Error("Duplicate value");
    }
});

const validateProductCount = (productContaint,salesAmount,res ) => {
    if (productContaint.productCount < salesAmount) {
        res.status(404)
        throw new Error("There is not enough Product in Grocery!");
    }
}

//update a sales
const updateSales = asyncHandler(async (req, res) => {
  const { params, body } = req;
  const sales = await salesModel.findOneAndUpdate(
    { _id: params.id },
    
      {
        $set: {
          productId: body.productId,
          salesAmount: body.salesAmount,
        }
      }
  );

  if (!sales) {
    res.status(404);
    throw new Error("sales not found");
  }
  console.log(sales);
  //if some amount added or dicreased form sales it will be added to producsts
  const diffrentSalesAmount = sales.salesAmount - body.salesAmount;
  console.log(diffrentSalesAmount);
  await producModel.findByIdAndUpdate({_id:body.productId}, {$inc:{"productCount":diffrentSalesAmount}});

  res.status(201).json(sales);
});

//delete sales
const deleteSales = asyncHandler(async (req,res) => {
    const {params} = req;
    const sales= await salesModel.findOne({ _id: params.id });
    
    
    if (!sales ) {
      res.status(404);
      throw new Error("sales not found");
    }
     await producModel.findByIdAndUpdate({_id:sales.productId}, {$inc:{"productCount":sales.salesAmount}});
      res.status(200).json(sales)
})
module.exports = {
  getSales,
  createSales,
  updateSales,
  deleteSales
};
