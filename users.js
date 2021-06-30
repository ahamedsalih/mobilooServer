const users = [];

const addUser = ({ id, name, room,nickname }) => {
  name = name
  room = room.trim().toLowerCase();

  // const existingUser=users.find((user)=>user.room===room && user.name===name)

  // if(existingUser){
  //     return { error:"username is already taken"}
  // }
  const user = { id, name, room,nickname };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUserInRoom };
