const express=require("express");

const router=express.Router();

const jwt=require("jsonwebtoken");

const Register=require("../models/resgister/register")


const JWT_SECRET=process.env.JWT_SECRET;

const requireLogin=require("../middleware/requireLogin");


router.post("/register/user",(req,res)=>{
    const {phoneNumber,name,image}=req.body;


    Register.findOne({phoneNumber}).then(result=>{
        if(!result){
            const user=new Register({
                phoneNumber,
                name,
                image 
             })
       
           user.save().then(savedUser=>{
              const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
              const {_id,name,image,phoneNumber}=savedUser;
             return res.status(200).json({token,user:{_id,name,image,phoneNumber}})
           }).catch(err=>console.log(err)) 
        }
        else{
            return res.json({already:"your mobile number already registered"})
        }
    })
 
 
      
   
     

           


})

router.post("/login/registered/user",(req,res)=>{
    const {phoneNumber}=req.body;
 
 
   Register.findOne({phoneNumber}).then(result=>{
       if(!result){
           return res.json({error:"your phone number not registered in mobilio"})
       }
       else{
        const token=jwt.sign({_id:result._id},JWT_SECRET)
        const {_id,name,image,phoneNumber}=result;
       return res.status(200).json({token,user:{_id,name,image,phoneNumber}}) 
       }
   }).catch(err=>console.log(err))  



})


router.post("/update/image",(req,res)=>{

    const {id,image}=req.body;

    console.log("-----id,image------",id,image);

    Register.findByIdAndUpdate(id,{image},{new:true}).then(result=>{
       return res.status(200).json(result);
    }).catch(err=>console.log(err));
})


router.get("/users",requireLogin,(req,res)=>{
    Register.find({name:{$ne:req.user.name}}).then(user=>{
        if(!user){
            return res.status(402).json({error:"user not there"})
        }
        return res.status(200).json({user})
    }).catch(err=>{
        console.log("user not fetched")
    })
})


router.get("/usermobilio",(req,res)=>{
    Register.find().then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err))
})

router.post("/find/user",(req,res)=>{
    const {phoneNumber}=req.body;
    Register.findOne({phoneNumber}).then(result=>{
        if(result){
            return res.json({registered:"this mobile number already registered"})
        }
    })
})


router.post("/findnumber",(req,res)=>{
    const {phoneNumber}=req.body;

    Register.findOne({phoneNumber}).then(result=>{
        if(result){
            res.json(result)
             console.log("user exists")
        }
        else{
            
             console.log("user not found")
        }
    })
})


router.post("/findnumberotp",(req,res)=>{
    const {phoneNumber}=req.body;

    console.log("-----phoneNumber-----",phoneNumber);
    
    Register.findOne({phoneNumber}).then(result=>{
    if(result){
        return res.json({success:"This number is already registered in mobilio"})
    }
    else{
        return res.json({notfound:"You enter the number is not registered in mobilio"})
    }
    }).catch(err=>console.log(err))

})

module.exports=router;