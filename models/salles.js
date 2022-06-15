
const mongoose = require("mongoose");
const salesSchema =new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
},
    salesCount:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model("sales",salesSchema);