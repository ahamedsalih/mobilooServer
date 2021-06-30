const mongoose=require("mongoose");


const orders=new mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItems",
        required:true
    }],
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
 pincode:{
     type:Number,
     required:true
 },
 country:{
     type:String,
     required:true
 },
 phoneNumber:{
     type:Number,
     required:true
 }, 
 status:{
    type:String,
    default:"pending",
    required:true
},
totalPrice:{
    type:Number,
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Register"
},
dateOrdered:{
    type:Date,
    default:Date.now
},
paymentType:{
    type:String,
    required:true
},
paymentId:{
    type:String
}
})


module.exports=mongoose.model("Orders",orders);