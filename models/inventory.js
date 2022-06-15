const mongoose = require("mongoose");
const salesSchema =new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
},
    productCount:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model("products",salesSchema);