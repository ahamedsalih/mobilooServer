const mongoose=require("mongoose");

  

const domainSchema=new mongoose.Schema({
domainName:{
    type:String,
    required:true
},
userId:{
    type:String,
    required:true
}
},{timestamps:true})


module.exports=mongoose.model("Domain",domainSchema);