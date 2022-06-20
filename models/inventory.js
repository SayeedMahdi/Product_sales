const mongoose = require("mongoose");
const salesSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
},
    count:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("products",salesSchema);