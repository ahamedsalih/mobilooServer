const mongoose=require("mongoose");



const statusModel=new mongoose.Schema({
    statusPicture:{
        type:String,
        required:true
    },
    textCaption:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register",
        required:true
    },
    profilePic:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:"2m"
    }
},{timestamps:true})


module.exports=mongoose.model("Status",statusModel)