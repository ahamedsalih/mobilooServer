const mongoose=require("mongoose");




const groupSchema=new mongoose.Schema({

   groupName:{
       type:String,
       required:true
   },

  image:{
      type:String
  },
  members:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Register",
  required:true
  }
  ],
  
  groupAdmin:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Register",
    required:true  
  }]

},{timestamps:true});


module.exports=mongoose.model("Group",groupSchema);