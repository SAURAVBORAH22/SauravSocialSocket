//calling socket io
const io = require('socket.io')(8900, { 
    cors: {
        origin: 'http://localhost:3000' //for development
    }
}); //port number


//for more info on socket io see https://socket.io/docs/

//listen for connection
io.on('connection', (socket) => {
    console.log('New user connected');
})