const users=[];


const adduser=({socketId,name,roomId,userId})=>{
    // const exist=users.find(user=>user.roomId===roomId&&user.userId===userId);
    // if(exist){
    //    return {error:"user already exists"}
    // }

    const user={socketId,name,roomId,userId};

    users.push(user);
    console.log("users list",users);
    return {user}
}


const removeuser=(socketId)=>{
    const index=users.findIndex(user=>user.socketId===socketId);
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}


const getuser=(socketId)=>users.find(user=>user.socketId===socketId);


module.exports={adduser,removeuser,getuser};