const salesModel = require("../models/sales");
const productModel = require("../models/inventory");
const asyncHandler = require("express-async-handler");


//Get all tts
const getSales = asyncHandler( async (req, res) => {
  const sales = await salesModel.find({}).populate({path:"productId"});
  if (sales) {
    res.status(200).json(sales);
  }
});


const createSales = asyncHandler(async (req, res) => {
  const productId = req.body.productId;
  const salesCount = req.body.count;
  const product = await productModel.findById({_id: productId});

  if(!product){
    res.status(404)
    throw new Error(`No product fount with id ${productId}`);
  }
  validateProductCount(product, salesCount,res);

  product.count   -= salesCount;
  const saveProductChanges = await product.save();

  const sales = await salesModel.create(req.body);
  if (sales && saveProductChanges) {
    res.status(201).json(sales);
  } 
});

const validateProductCount = (productContent,salesAmount,res ) => {
    if (productContent.productCount < salesAmount) {
        res.status(404)
        throw new Error("There is not enough Product in Grocery!");
    }
}

const updateSales = asyncHandler(async (req, res) => {
  const saleId = req.params.id;
  const newProductId = req.body.productId;
  const newCount = req.body.count;

  const sale = await salesModel.findById(saleId);
  const oldProduct = await productModel.findById(sale.productId);
  const newProduct = await productModel.findById(newProductId);

 
  
  if (oldProduct._id === newProduct._id) {
    validateProductCount(oldProduct, (newCount - sale.count), res);
    saveSale(sale, oldProduct, (newCount - sale.count));

  } else {
    validateProductCount(newProduct, newCount, res);
    newProduct.count +=sale.count;
    await newProduct.save();
    
    saveSale(sale, newProduct, newCount);
  }

  res.json(sale);
});

const saveSale = asyncHandler(async (sale, product, count) => {
  product.count -=  count;
   await product.save();

  sale.count = count;
   await sale.save();
});



//delete sales
const deleteSales = asyncHandler(async (req,res) => {
    const {params} = req;
    const sales= await salesModel.findOneAndDelete({ _id: params.id });
    
    
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



