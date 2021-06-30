const mongoose=require("mongoose");



const wallpaperThemes=new mongoose.Schema({

    wallpaper:{
        type:String,
        required:true
    }
  
},{timestamps:true})


module.exports=mongoose.model("Wallpaper",wallpaperThemes);