const mongoose=require("mongoose");



const userList=new mongoose.Schema({

    roomId:{
        type:String,
        required:true
    },
    
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register",
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register",
        required:true 
    }

},{timestamps:true});
 

module.exports=mongoose.model("Userlist",userList)