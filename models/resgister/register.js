const mongoose=require("mongoose");



const registerSchema=new mongoose.Schema({
    phoneNumber:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
},{timestamps:true})


module.exports=mongoose.model("Register",registerSchema);