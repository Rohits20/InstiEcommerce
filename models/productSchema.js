const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productAge: {
    type: Number,
    required: true,
  },
  productWarranty: {
    type: Number,
    required: true,
  },
  productSpecs: {
    type: String,
    required: true,
  },
  productSellerEmail:{
    type: String,
    required: true,
  },
  productBuyerEmail:{
    type:String,
    required: false,
  },
  productSold:{
   type: Boolean,
   required:false, 
  },
  productImagesURL:{
   type: [String],
   required : true,
  }
});

const product =  new mongoose.model("ecommerce",productSchema ,"productDetail");

module.exports = product;