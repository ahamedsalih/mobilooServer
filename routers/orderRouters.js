const express=require("express");

const router=express.Router();

const Orders=require("../models/orderSchema/orders");

const OrderItem=require("../models/orderSchema/orderItems");


const  client = require("twilio")(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);



 
router.post("/orders",async(req,res)=>{

    const {orderItems,shippingAddress,city,state,pincode,country,phoneNumber,totalPrice,user,paymentType,paymentId}=req.body;

    const orderItemsIds=Promise.all(orderItems.map(async orderItem=>{
        let newOrderItem=new OrderItem({
            product:orderItem._id,
            quantity:orderItem.productQuantity,
            storeId:orderItem.userStoreId._id,
            shippingAddress:shippingAddress,
            city:city,
            state:state,
            country:country,
            pincode:pincode,
            phoneNumber:phoneNumber,
            user:user,
            totalPrice:totalPrice,
            paymentId:paymentId,
            paymentType:paymentType
        })
        newOrderItem=await newOrderItem.save();
 
        return newOrderItem._id;
    }))
    const orderItemsResolved=await orderItemsIds;
    console.log(orderItemsIds)

  let orders=new Orders({
    orderItems:orderItemsResolved,
    shippingAddress,
    city,
    state,
    pincode,
    country,
    phoneNumber,
    totalPrice,
    user,
    paymentType,
    paymentId 
  })
  orders=await orders.save();
  if(!orders){
      return res.status(400).send("order can't be created")
  }
res.send(orders);
})




router.post("/get/orders",(req,res)=>{
    const {id}=req.body;

 

    Orders.find({user:id}).populate("orderItems").populate({path:"orderItems",populate:{path:"product",populate:"userStoreId"}}).sort("-dateOrdered").then(result=>{

     return res.status(200).json(result);

    }).catch(err=>console.log(err))
})


router.post("/get/orderitems",(req,res)=>{
  

const {storeId,status}=req.body;
    console.log("---storeid----",storeId)
    OrderItem.find({$and:[{storeId:storeId},{status:status}]}).populate("product").populate("user").sort("-createdAt").then(result=>{

     return res.status(200).json(result);

    }).catch(err=>console.log(err))
})

router.post("/get/orderitems/all",(req,res)=>{
  

const {storeId}=req.body;
    console.log("---storeid----",storeId)
    OrderItem.find({storeId:storeId}).populate("product").populate("user").sort("-createdAt").then(result=>{

     return res.status(200).json(result);

    }).catch(err=>console.log(err))
})


router.post("/status/update",(req,res)=>{

    const {status,orderItemId}=req.body;


    OrderItem.findOneAndUpdate({_id:orderItemId},{status:status},{new:true}).then(result=>{
        return res.status(200).json(result)
    }).catch(err=>console.log(err));



})



router.post('/send/sms', (req, res) => {
    client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to:"+918667430719",
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });








module.exports=router;