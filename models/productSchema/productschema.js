const mongoose=require("mongoose");


const ProductSchema=new mongoose.Schema({
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
  discountPrize:{
      type:Number
},
brandName:{
    type:String,
    required:true
},
productCategory:{
    type:String,
    required:true
},
inStock:{
    type:Number,
    required:true
},
dateCreated:{
    type:Date,
    default:Date.now
}
},{timestamps:true})


module.exports=mongoose.model("ProductSchema",ProductSchema);