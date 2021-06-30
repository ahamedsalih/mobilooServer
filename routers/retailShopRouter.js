const express=require("express");

const router=express.Router();

const RetailShops=require("../models/retailShopModel");

const RetailStore=require("../models/RetailModel");

const Product=require("../models/productModel");



const ProductSchema=require("../models/productSchema/productschema");





router.post("/retailshops",(req,res)=>{
const {shopName,storeImage,products,price,details}=req.body;

const shopNames=new RetailShops({
    name:shopName,
    storeImage:storeImage,
    products:products,
    price:price,
    details:details
})

shopNames.save().then(result=>{
  return res.status(200).json(result);
}).catch(err=>console.log(err))


});


router.get("/shops",(req,res)=>{
    RetailShops.find().then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err))
})

//create-shop
router.post("/createShops",(req,res)=>{
    const {name,image,user,shopAddress}=req.body;
    console.log("-----fields----",name,image);
    const shop=new RetailStore({
        name:name,
        image:image,
        user:user,
        shopAddress:shopAddress
    })

    shop.save().then(result=>{
        if(!result){
        console.log("----no data---")
        }
        else{
            return res.status(200).json(result)
        }
        
    }).catch(err=>console.log(err))

})

//get-shops
router.get("/get/shops",(req,res)=>{
    RetailStore.find().populate("user","name email").sort("-createdAt").then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err))
})





//get user stores


router.post("/get/userstores",(req,res)=>{
    const {id}=req.body;

 RetailStore.find({user:id}).populate("user").then(result=>{
     return res.status(200).json(result)
 }).catch(err=>console.log(err))

})

//delete-shop

router.post("/delete/shop",(req,res)=>{
    
    const {id}=req.body;

    RetailStore.findByIdAndDelete(id).then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err));
})

//update-shop

router.post("/update/shop",(req,res)=>{
  
    const {id,name,image}=req.body;

    RetailStore.findByIdAndUpdate(id,{
       name:name,
       image:image 
    },{new:true}).then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err))
})


//create-product

router.post("/add/product",(req,res)=>{

    const {productName,productImage,productDescription,productPrize,discountPrize,inStock,productCategory,productQuantity,userStoreId}=req.body;

    const newProduct=new Product({
       productName,
       productImage,
       productDescription,
       productPrize,
       userStoreId,
       productCategory,
       productQuantity,
       discountPrize,
       inStock
    })

    newProduct.save().then(result=>{
        console.log("created successfully");
        res.json(result);
    }).catch(err=>console.log(err))
  
})


//get/products

router.post("/productAll",(req,res)=>{

    const {id}=req.body;

    // console.log("idProduct------",id);

  Product.find({userStoreId:id}).populate("userStoreId").populate({path:"userStoreId",populate:"user"}).then(result=>{
        res.status(200).json(result)

    }).catch(err=>console.log("error occured"))
})

//delete-single-product

router.post("/delete/product",(req,res)=>{
    const {id}=req.body;

    Product.findByIdAndDelete(id).then(result=>{
       return res.status(200).json(result);
    }).catch(err=>console.log(err));
})

//update-single-product

router.post("/update/product",(req,res)=>{

    const {id,productName,productPrize,productDescription,productImage,discountPrize}=req.body;


    Product.findByIdAndUpdate(id,{
      productName,
      productImage,
      productDescription,
      productPrize,
      discountPrize
    },{new:true}).then(result=>{
       return res.status(200).json(result);
    }).catch(err=>console.log(err));
})





router.post("/get/productsCategory",(req,res)=>{
const {productCategory,userStoreId}=req.body;

Product.find({$and:[{productCategory:productCategory},{userStoreId:userStoreId}]}).populate("userStoreId")
.then(result=>{
    return res.status(200).json(result);
}).catch(err=>console.log(err));

})




module.exports=router;