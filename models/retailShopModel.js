const mongoose=require("mongoose");



const retailShopSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    storeImage:{
      type:String,
      required:true
    },
    details:{
     type:Object,
     required:true,
     address:{
         type:String
     },
     phno:{
         type:String
     },
     email:{
         type:String
     }
    },
    products:{
    type:Object,
    required:true,
    image1:{
        type:String
    },
    image2:{
        type:String
    },
    image3:{
        type:String
    },
    image4:{
        type:String
    }
    },
    price:{
        type:Object,
        required:true,
        price1:{
            type:Number
        },
        price2:{
            type:Number
        },
        price3:{
            type:Number
        },
        price4:{
            type:Number
        }
    }
},{timestamps:true})


module.exports=mongoose.model("Retail",retailShopSchema);