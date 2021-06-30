const users=[];


const Retailadduser=({socketId,name})=>{
 

    const user={socketId,name};

    users.push(user);
    console.log("users list",users);
    return {user}
}


// const removeuser=(socketId)=>{
//     const index=users.findIndex(user=>user.socketId===socketId);
//     if(index!==-1){
//         return users.splice(index,1)[0]
//     }
// }


const Retailgetuser=(socketId)=>users.find(user=>user.socketId===socketId);


module.exports={Retailadduser,Retailgetuser};