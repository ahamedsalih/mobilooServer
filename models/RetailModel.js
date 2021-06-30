const mongoose=require("mongoose");


const retailSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register",
        required:true
    },
    shopAddress:{
        type:Object,
        required:true
},
},{timestamps:true})


module.exports=mongoose.model("RetailShop",retailSchema);