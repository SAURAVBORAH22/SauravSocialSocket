//calling socket io
const io = require("socket.io")(8900, { //listening on port 8900
    cors: { //cors is used to allow cross origin resource sharing
        origin: "http://localhost:3000", //allowed origin
    },
});


//creating a user array
let users = [];


//adding user
const addUser = (userId, socketId) => {  //userId is the user id and socketId is the socket id
    !users.some((user) => user.userId === userId) && //checking if user is already present in the array
        users.push({ userId, socketId }); //pushing the user in the array
};


//removing user
const removeUser = (socketId) => { //socketId is the socket id
    users = users.filter((user) => user.socketId !== socketId); //filtering the user from the array
}

//for more info on socket io see https://socket.io/docs/

//listen for connection
io.on("connection", (socket) => {
    //when connection is made
    console.log('a user connected.'); //logs when a new user connects
    //after every connection , take userId and socketId from user
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id); //add user in user array
        io.emit("getUsers", users); //emit users to all users
    });

    //disconnect function
    socket.on("disconnect", () => {
        console.log("a user disconnected!"); //logs when a user disconnects
        removeUser(socket.id); //remove user from user array
        io.emit("getUsers", users); //emit users to all users
    });
});