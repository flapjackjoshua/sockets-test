const express = require('express');
const socket = require("socket.io");
const port = process.env.PORT || 4000;
//App setup
const app = express();
var server = app.listen(port, () => {
    console.log(`connect on port ${port}`);
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


