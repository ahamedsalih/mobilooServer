const express=require("express");

const router=express.Router();

const User=require("../models/userAuth");


const bcrypt=require("bcryptjs")

const nodemailer=require("nodemailer");
// const requireLogin=require("../middleware/requireLogin");

// const requireLogin =require("../middleware/requireLogin")





router.post("/forgotpassword",(req,res)=>{
    const {email}=req.body;
    if(email===""){
        return res.status(422).json("email shouldn't empty")
    }
    User.findOne({email:email})
    .then(user=>{
        console.log(user)
        if(!user){
            return res.status(422).json({error:"email not in db"})
        }
        else{
            const otp=Math.floor(Math.random() * 10000)
            user.resetOtp = otp;
            user.resetPasswordExpires = Date.now() + 3600000;
            user.save().then(result=>{

                const Transporter=nodemailer.createTransport({
                    service:"gmail",
                    auth:{
                        user:`${process.env.EMAIL_ADDRESS}`,
                        pass:`${process.env.EMAIL_PASSWORD}`
                    }
                })
    
                const mailOptions={
                    from:"ahamed.salih@gmail.com",
                    to:`${user.email}`,
                    subject:"get your otp",
                    html:`<h3>your OTP is ${otp}</h3>`
                };
                console.log("sending mail")
    
                Transporter.sendMail(mailOptions,(err,success)=>{
                    if(err){
                        console.log("errrrrrr",err)
                       return res.status(401).json({err:"send otp failed"})
                    }
                    
                        return res.status(200).json({msg:"recovery email sent"})
                    
                })

            }).catch(err=>{
                console.log(err)
            })

            
        }
    })
})


router.post("/otp",(req,res)=>{
    const {otp,email} = req.body;
   
    User.findOne({
        email:email,
        resetOtp: otp,
        resetPasswordExpires:{$gt:Date.now()}
    }).then(user=>{
        console.log(user)
        if(!user){
     return res.status(422).json({error:"invalid otp"})
        }
        return res.status(200).json({msg:"otp success"})
       
    }).catch(err=>console.log(err))
})


router.post("/newpassword",(req,res)=>{
    const {newpassword,email}=req.body;
    User.findOne({email:email}).then(user=>{
        if(!user){
            return res.status(422).json({error:"user not found"})
        }
      bcrypt.hash(newpassword,12).then(hashedpassword=>{
          user.password=hashedpassword;
          user.save().then(saveduser=>{
            
              res.status(200).json({msg:"password updated successfully"})
          })
      }).catch(err=>{
          console.log(err)
      })
    })
})







module.exports=router;


