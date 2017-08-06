const express = require('express');
const socket = require("socket.io");

//App setup
const app = express();
var server = app.listen(4000, () => {
    console.log("connected on port 4000");
});



app.use(express.static("public"));

const io = socket(server);

io.on('connection', (socket) => {
    console.log("New client Connected " + socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});


