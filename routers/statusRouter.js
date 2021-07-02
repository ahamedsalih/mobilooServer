const express=require("express");

const router=express.Router();

const Status=require("../models/statusModel");
const StatusSchema=require("../models/Status");

const Posting=require("../models/postSchema/PostSchema");




router.post("/status",(req,res)=>{

    const {statusPicture,textCaption,userId,profilePic}=req.body;

    console.log(statusPicture,textCaption,userId,profilePic)


    const status=new Status({
        statusPicture,
        textCaption,
        userId,
        profilePic
    })

status.save().then(result=>{
    return res.status(200).json(result)
}).catch(err=>console.log(err))

})

router.get("/get/status",(req,res)=>{
    Status.find().populate("userId").then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err))
})

router.get("/get/status/user",(req,res)=>{
    StatusSchema.find().then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err))
})

router.post("/get/status/userId",(req,res)=>{
    const {userId}= req.body;
    StatusSchema.find({userId}).then( result=>{
        return res.status(200).json( result)
    }).catch(err=>console.log(err))
})



router.post("/status/user/story",(req,res)=>{
    const {username,title,stories,userId,story,profile}=req.body;
    console.log("------dataStatussss----",username,title,stories,userId,story,profile);

    StatusSchema.findOne({userId:userId}).then(result=>{

     if(result){
         StatusSchema.findOneAndUpdate({userId:userId},{$push:{stories:story}},{new:true}).then(finalresult=>{
             return res.json(finalresult);
         }).catch(err=>console.log(err))
     }
     else{
        const status=new StatusSchema({
            username,
            userId,
            profile,
            title,
            stories
        })
    
    status.save().then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err))
     }

    })

})



//posting router
 

router.post("/posting/user",(req,res)=>{

  const {text,image,userId,video,postCategory}=req.body;

  console.log("---posting---",text,image,postCategory,userId);

 const post=new Posting({
     text,
     image,
     userId,
     video,
     postCategory
 })

 post.save().then(result=>{
     if(result){
         res.json({success:"posted succesfully"})
     }
     else{
        res.json({error:"unable to post"}) 
     }
 }).catch(err=>console.log(err))


}) 

router.get("/get/postings",(req,res)=>{
    // var limits=parseInt(req.params.limit);
//    console.log("limits---",limits)

    Posting.find().populate("userId").sort("-createdAt").then(result=>{
        res.status(200).json(result)
    })
})


//like post


router.post("/like/post",(req,res)=>{

    const {postId,userid}=req.body;

    Posting.findOneAndUpdate({_id:postId},{$push:{likes:userid}},{new:true}).then(result=>{
        if(result){
            res.json({success:"liked"})
        }
        else{
            res.json({error:"error"})
        }
    }).catch(err=>console.log(err))

})


//unlike post



router.post("/unlike/post",(req,res)=>{

    const {postId,userid}=req.body;

    Posting.findOneAndUpdate({_id:postId},{$pull:{likes:userid}},{new:true}).then(result=>{
        if(result){
            res.json({success:"unliked"})
        }
        else{
            res.json({error:"error"})
        }
    }).catch(err=>console.log(err))

})




module.exports=router;




//eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTU5OTUxNTkzYzY0NTI5M2YzZjc0OTEyOWQ3NjQzYTJmMWUzNmQxM2E4Nzk2ZGIzNDg0ODc4YzhlMjZhOGFmNjUyY2FlMmQwOTE0NDc2MTAiLCJpYXQiOjE2MjMwNTg2ODguMzg1MDc3LCJuYmYiOjE2MjMwNTg2ODguMzg1MDgsImV4cCI6NDc3ODczMjI4OC4zNDA1NDgsInN1YiI6IjUxNTk1MjI1Iiwic2NvcGVzIjpbInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIl19.NpvuM9aVcbRXYBLm_cNo_E9YaG-n9Dah9OXtn2b4zPHFHUL9syxtBU389lIHjKfSHwlnvZm7RYaO-g02_ZGSOV6QNbqFhOF995Yvz8LPdvbnCajjQTKWSdE042XhvAS-3vWgt3JZ4ElWsBK3Nbr9Fhdr9NMgcQQrdwhOgQxVGJj7nphkvgoZb3PkLw79VM-R6dX_v_ikq0af3xYSYPXGmELmuk92kv5CyzzEc81DGazMVryBE-7S_t_kM_60d7XXRswGe_zOmmXOEm0vIrCNLBK_lCjiWsjlo8jzil9-64XbmJ_JwF32J_mCHTvSyX-G3eVs3kGGIEqgZ-YS3bcC_i8jbj6dWWOecgKejYQBTtlMNdL92TEaCrv_qH1mE3NiEt-TacluY_odPf7dpT3mmlifSEecrgDdowNcB9sfWn61cTWtk9z_c6-tcSYdF0wb6fAG627E92eF34nGW5ZHcAZvyOyHZegJhjS0phcIVICGob0-T0qtxoq425Ibi0cJXFWAiYtHJ8u-polhZLS3VDy61D9FpyG3Ppj_XX0SLIcwuJaSsv76f8V3tkwucahgtsLsLQFiNAslv0fQfZx6-0OwdYhdniqNzlXwR0yL-CS9kfvt_1HE6FBFHfLx2H-0GIRrLYvCfmIbKbP6ATFwFOewnKYoN2i-_fRBNIxIp14