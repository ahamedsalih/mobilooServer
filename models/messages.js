const mongoose=require("mongoose");


const messagesSchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    text:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        required:true
    },

    image:{
        type:String,
        default:""
    },
   pdf:{
       type:String,
       default:""
   },
   audio:{
       type:String,
       default:""
   },
    user:{
   type:Object,
   required:true,
        _id:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    },
    roomId:{
        type:String,
        required:true
    }

},{timestamps:true})


module.exports=mongoose.model("Messages",messagesSchema);