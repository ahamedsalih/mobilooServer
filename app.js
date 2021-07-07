const express = require("express");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io").listen(server);

const PORT = process.env.PORT || 5000;

const Messages=require("./models/messages");

const Token=require("./models/tokens/tokens");

const webp=require("webp-simple-converter");

const uuidv1=require("uuid/v1");

const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

const {adduser,removeuser,getuser}=require("./helperfunctions")

const {Retailadduser,Retailgetuser}=require("./helper");

const firebaseAdmin=require("firebase-admin");

const serviceAccount=require("./firebase.json");


firebaseAdmin.initializeApp({
  credential:firebaseAdmin.credential.cert(serviceAccount),
});


require('events').EventEmitter.prototype._maxListeners = 100;


require("dotenv").config();

const mongoose = require("mongoose");

webp.grant_permission();

// db connection
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db disconnected");
  });

app.use(express.json());






//socket connection for private message
io.on("connection", (socket) => {
 console.log("socket id",socket.id)


socket.on("joinUser",({name,roomId,userId})=>{
  const {error,user}=adduser({socketId:socket.id,name,roomId,userId});

  // if(error){
  //   console.log("join error",error);
  // }
  // else{
    socket.join(roomId);
    console.log("join users",user);
  // }
})


socket.on("sendMsg",(message,roomId)=>{
  // const user=getuser(socket.id);

  console.log("-----msghhhhh----",message)

const messageObject={ 
   _id:uuidv1(),
  text:message[0].text?message[0].text:"",
  createdAt: new Date(),
  roomId:roomId,
  image:message[0].image?message[0].image:"",
  pdf:message[0].pdf?message[0].pdf:"",
  audio:message[0].audio?message[0].audio:"",
   user: {
    _id:message[0].user._id ,
    name:message[0].user.name,
    // avatar: "https://placeimg.com/140/140/any"
  }
  
}

    
      const messages=new Messages(messageObject);
      console.log("msgssgsgsgs",messageObject);
      messages.save().then(results=>{
        // console.log("resultssssss",results)
        io.to(roomId).emit("msg",results);

      })
    
})

socket.on("oldMessages",roomId=>{
  Messages.find({roomId}).sort("-createdAt").then(result=>{
    socket.emit("oldMsgs",result);
  })
})

socket.on("disconnect",()=>{
  const user=removeuser(socket.id);
  console.log("disconnected",user);
})




//group chat------->

socket.on("joinGroupAll",({name,roomId,userId})=>{
  const {error,user}=adduser({socketId:socket.id,name,roomId,userId});

  // if(error){
  //   console.log("join error",error);
  // }
  // else{
    socket.join(roomId);
    console.log("join users",user);
  // }
})



socket.on("sendMsgGroup",(message,roomId)=>{



  const messageObject={ 
    _id:uuidv1(),
   text:message[0].text?message[0].text:"",
   createdAt: new Date(),
   roomId:roomId,
   image:message[0].image?message[0].image:"",
   pdf:message[0].pdf?message[0].pdf:"",
   audio:message[0].audio?message[0].audio:"",
  
    user: {
     _id:message[0].user._id ,
     name:message[0].user.name,
     // avatar: "https://placeimg.com/140/140/any"
   }
   
 }

//126466271823
//arn:aws:iam::126466271823:user/ahamedSalih03
//https://ahamed-salih03.signin.aws.amazon.com/console
    
      const messages=new Messages(messageObject);
      console.log("msgObj",messageObject);
      messages.save().then(results=>{
        // console.log("resultssssss",results)
        io.to(roomId).emit("msgGroup",results);

      }).catch(err=>console.log(err))
    
})



socket.on("oldGroupMessages",roomId=>{
  Messages.find({roomId}).sort("-createdAt").then(result=>{
    socket.emit("oldGrpMsgs",result);
  })
})






socket.on("disconnect-group",()=>{
  const user=removeuser(socket.id);
  console.log("disconnected",user);
})









 
 
 
 
 
 
//fetching images,contacts sockets 
socket.on("join", ({ name, room,nickname }) => {
    console.log("name&room",name, room,nickname);

    const { error, user } = addUser({ id: socket.id, name, room,nickname });
    const onlineUsers=[];
   const onlineuser=({socketId:user.id,name:user.name,room:user.room});
   onlineUsers.push(onlineuser)
   socket.emit("onlinejoineduser",onlineUsers);
   console.log("onlineUser",onlineuser)
    if (error) {
      return error;
    }
    // socket.emit("message", {user: "admin",text: `${user.name}, ${user.room}`
    // }
    // );
    // socket.broadcast.to(user.room).emit("message", { user: "admin", text:`${user.name} has joined` });

    socket.join(user.room);
    io.to(user.room).emit("roomData",{room:user.room,users:getUserInRoom(user.room)});
  });

  socket.on("sendMessage", (message) => {
    console.log("msggg", message);
    // socket.emit("msgs",message);
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message,nickname:user.nickname });
    io.to(user.room).emit("roomData",{room: user.room,users:getUserInRoom(user.room)});
  });

  //socket disconnection
  io.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("disconnect",user)
  });


 


//for retail socket

socket.on("retail-join",({name})=>{
  const {user}=Retailadduser({socketId:socket.id,name});

    io.emit("joinmessage",`hello${name}`)

    console.log("---------Retailjoin user--------",user);
  // }
})


socket.on("sendShopMsg",(shopname,image)=>{
  const message={
    name:shopname,
    images:image
  }
  io.emit("shopData",message);
  console.log("------msggggggg-------", message);
})


});




// var reqTimer = setTimeout(function wakeUp() {
//   request("https://mobilio1.herokuapp.com", function() {
//      console.log("WAKE UP DYNO");
//   });
//   return reqTimer = setTimeout(wakeUp, 120000);
// }, 120000);

// app.use(passport.initialize());
// app.use(passport.session());



//Router
app.use(require("./routers/userRouters"));
app.use(require("./routers/forgotRouter"));
app.use(require("./routers/googleAuth"));
app.use(require("./routers/retailShopRouter"));
app.use(require("./routers/statusRouter"));
app.use(require("./routers/orderRouters"));
app.use(require("./routers/registerRouter"));

 
//firebase----->>>>>




app.post("/notifications/firebase", async (req, res) => {
  try {
    const { title, body,tokens,image} = req.body;
    console.log("---details---",title,body,tokens);
    const payload = {
      notification: {
          title: title,
          body:body,
          icon: "ic_launcher",
          badge: '1',
          sound:'default',
          image:image
         },
      
      };

    await firebaseAdmin.messaging().sendToDevice(tokens,payload);
    console.log("successssss")
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    console.log("failureeeee")
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});
// const tokens=[];
app.post("/notifications/firebase/group", async (req, res) => {
 
  try {
    const { title, body, image,token } = req.body;
  const  tokens =token.filter(function(elem, pos) {
      return token.indexOf(elem) == pos;
  })
    console.log("uniqueTokens====>",tokens);
    await firebaseAdmin.messaging().sendMulticast({
      tokens,
      notification: {
        title: title,
        body:body,
        image:image
      },
    });
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});


app.post("/specific/token",(req,res)=>{
  const {id}=req.body;

  console.log("id------",id);

  Token.findOne({tokenFrom:id}).then(result=>{
    return res.status(200).json(result);
  }).catch(err=>console.log(err));


})



//server running PORT
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
