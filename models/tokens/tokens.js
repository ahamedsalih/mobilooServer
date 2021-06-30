const mongoose=require("mongoose");



const tokenSchema=new mongoose.Schema({
   token:{
       type:String,
       required:true
   },
   tokenFrom:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Register",
       required:true
   }
},{timestamps:true})


module.exports=mongoose.model("Token",tokenSchema);