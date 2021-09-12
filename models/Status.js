const mongoose=require("mongoose");

const uuid=require("uuid/v4");

const statusSchema=new mongoose.Schema({
username:{
    type:String,
    required:true
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
},
title:{
    type:String,
    required:true
},
profile:{
    type:String
},
stories:[{
    id:{
        type:mongoose.Schema.Types.Mixed,
        default:uuid()
    },
  url:{
      type:String,
      required:true
  },
  type:{
      type:String,
      default:"image"
  },
  duration:{
      type:Number,
      default:2 
  },
  isReadMore:{
      type:Boolean,
      default:false
  },
  url_readmore:{
      type:String,
      default:""
  },
  created:{
    type:Date,
    default:Date.now,
    required:true
    
  }
}]
 

},{timestamps:true})




module.exports=mongoose.model("StatusSchema",statusSchema)