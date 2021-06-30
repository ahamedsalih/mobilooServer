const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
  productName:{
      type:String,
      required:true
  },
  productImage:{
      type:String,
      required:true
  },
  productDescription:{
      type:String,
      required:true
  },
  productPrize:{
      type:Number,
      required:true
  },
  productQuantity:{
      type:Number,
      default:1
  },
  userStoreId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"RetailShop",
      required:true
  },
  inStock:{
      type:Number
  },
  discountPrize:{
      type:Number
  },
  productCategory:{
      type:String
  }
},{timestamps:true})


module.exports=mongoose.model("Product",productSchema);