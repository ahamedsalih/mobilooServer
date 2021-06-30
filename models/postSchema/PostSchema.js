const mongoose=require("mongoose");

  

const postingSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },

    image:{
        type:String,
        default:""
    },
    video:{
        type:String,
        default:""
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register"
    },
    likes:[]
},{timestamps:true})


module.exports=mongoose.model("Posting",postingSchema);