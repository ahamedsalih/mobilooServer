const express=require("express");

const router=express.Router();

const User=require("../models/userAuth");
const Domain=require("../models/domain");
const Group=require("../models/groupModel/groupSchema");
const Wallpaper=require("../models/wallpaperThemes");
const Token=require("../models/tokens/tokens");
const UserList=require("../models/userLists");

// const Room=require("../models/roomModel")

const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
const userList = require("../models/userList");

// const crypto=require("crypto");

//const md5=require("md5")


const JWT_SECRET=process.env.JWT_SECRET;









router.post("/signup/seller",(req,res)=>{
    const {name,email,password,phonenumber,seller}=req.body;
    if(!email || !password || !name || !phonenumber|| !seller){
       return  res.status(422).json({error:"please fill all the fields"});
    }
    
    User.findOne({phonenumber:phonenumber})
    .then((savedUser)=>{
        console.log("savedddd",savedUser);
        if(savedUser){
            return res.status(422).json({error:"this ph no already exits"});
        }
else {
        bcrypt.hash(password,12)
        .then(hasedPassword=>{

            const user =new User({
                email,
                password:hasedPassword,
                name,
                phonenumber,
                seller
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
        }}).catch(err=>{console.log(err)})

       
    
    
})

 


// router.get("/users",requireLogin,(req,res)=>{
//     User.find({name:{$ne:req.user.name}}).then(user=>{
//         if(!user){
//             return res.status(402).json({error:"user not there"})
//         }
//         return res.status(200).json({user})
//     }).catch(err=>{
//         console.log("user not fetched")
//     })
// })









router.post("/get/user",(req,res)=>{

    const {id}=req.body;
    User.findOne({_id:id}).then(result=>{
        return res.status(200).json(result);
    }).catch(err=>console.log(err))
})

router.post("/createDomain",(req,res)=>{
    const {domainName,id}=req.body;

    Domain.findOne({domainName}).then(result=>{
        if(!result){
            

            const name=new Domain({
                domainName:domainName,
                userId:id
            })
        
            name.save().then(data=>{
        
                  return res.json({success:"created successfully"})
         
             
            }).catch(err=>console.log(err))
        }
        else{
            return res.json({error:"already taken this domain name"})
        }
    }).catch(err=>console.log(err))



})


router.post("/get/domain",(req,res)=>{
    const {id}=req.body;
   
    Domain.findOne({userId:id}).then(result=>{
      return res.status(200).json(result)
    }).catch(err=>console.log(err))

})

router.post("/group/chat",(req,res)=>{
    const {groupName,members,image,groupAdmin}=req.body;

    console.log("-----memberssgroup",groupName,members,image,groupAdmin);
   
     const creategroup=new Group({
         groupName,
         members,
         image,
         groupAdmin
     })
   creategroup.save().then(result=>{
    return res.json({success:"group created success"})
}).catch(err=>console.log(err))
})


router.post("/get/mygroup",(req,res)=>{
    const {id}=req.body;

    Group.find({$or:[{members:id},{groupAdmin:id}]}).populate("members").populate("groupAdmin").sort("-createdAt").then(result=>{
        if(result){
            return res.json(result)
        }
        else{
            return res.json({error:"not found"})
        }
    }).catch(err=>console.log(err))
})




router.post("/add/participants",(req,res)=>{
    const {id,membersId}=req.body;


    Group.findOneAndUpdate({_id:id},{$push:{members:membersId}},{new:true}).then(result=>{

        return res.json({success:"participants added successfully"});

    }).catch(err=>console.log(err))


})

router.post("/remove/participants",(req,res)=>{
    const {id,membersId}=req.body;
  

    Group.findOneAndUpdate({_id:id},{$pullAll:{members:membersId}},{new:true}).then(result=>{
        

        return res.json({success:"participants removed successfully"});

    }).catch(err=>console.log(err))


})




router.post("/wallpaper/add",(req,res)=>{

   const {uri}=req.body;

   const wallpaper=new Wallpaper({
    
    wallpaper:uri

   })

   wallpaper.save().then(result=>{
     
    return res.status(200).json({success:"wallpaper upload succesfully"})

   }).catch(err=>console.log(err));


})

router.get("/get/wallpaper",(req,res)=>{

 
    Wallpaper.find({}).then(result=>{
        return res.status(200).json(result);
    }).catch(err=>consol.log(err));


})



router.post("/register/token/user",(req,res)=>{

    const {token,user}=req.body;
  
    console.log("userIddd---->",user);
    console.log("tokennnnn---->",token);
  
   
    Token.findOne({tokenFrom:user._id}).then(result=>{
        console.log("result--->",result);
        if(result==null){
            const tokens=new Token({
                token:token,
                tokenFrom:user._id
              })
              tokens.save().then(last=>{
                  console.log("token saved successfully")
                return res.json({success:"token saved successfully"});
                
              }).catch(err=>console.log(err))
        }
        else{
            if(result.token===token){
                console.log("already registered your token");
                return res.json({already:"already registered your token"});
              
          
              }
              else{
                 result.token=token;
                 result.save().then(tokens=>{
                     console.log("changed successfully");
                     return res.json({changed:"changed successfully"})
                 })
              }
        }
  
   
  
    }).catch(err=>console.log(err))
  
  
  })

  router.post("/findtokens",(req,res)=>{
   const {id}=req.body;
   Token.find({tokenFrom:{$in:id}}).then(result=>{
       console.log("resultIds=====>>>",result);
       return res.status(200).json(result);
   }).catch(err=>console.log(err));
   
  })


router.post("/userContactRoomId",(req,res)=>{
    const {roomId,from,to}=req.body;

    UserList.findOne({roomId}).then(result=>{
        if(result){
            // return res.json({already:"roomid already in db"});
            console.log("roomId already in db ")
            res.json("already saved")
        }
        else{
            const newRoomId=new UserList({
                roomId,
                from,
                to
            })

          newRoomId.save().then(result=>{
              console.log("roomId saved successfully")
              res.json("successfully saved")
          }).catch(err=>console.log(err))  
        }
    }).catch(err=>console.log(err))
})

router.post("/getChatList",(req,res)=>{
   const {id}=req.body;

   UserList.find({from:id}).populate("to").then(result=>{
       if(result){
           res.json(result)

       }
       else{
           res.json({notfound:"chats not found"})

       }
   })
})








module.exports = router;