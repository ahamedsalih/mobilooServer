const mongoose=require("mongoose");


const orderItems=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{ 
        type:Number,
        required:true
    },

    status:{
        type:String,
        required:true,
        default:"pending"
    },

storeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RetailShop",
        required:true
    },
    shippingAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register",
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    paymentType:{
        type:String,
        required:true
    },
    paymentId:{
        type:String
    }

},{timestamps:true})


module.exports=mongoose.model("OrderItems",orderItems);