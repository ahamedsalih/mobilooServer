const mongoose=require("mongoose");



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    seller:{
        type:Boolean,
        default:false
    },
   googleId:String,
   resetOtp:String,
   resetPasswordExpires:Date,
   socketId:String
},{timestamps:true})


module.exports=mongoose.model("User",userSchema);