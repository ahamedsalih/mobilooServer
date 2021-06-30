const mongoose=require("mongoose");



const roomSchema=new mongoose.Schema({
    roomName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})


module.exports=mongoose.model("Room",roomSchema);