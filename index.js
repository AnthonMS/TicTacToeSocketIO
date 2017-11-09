var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function() {
    console.log("Listening for requests on port 4000");
});

// static files
app.use(express.static('client'));

// Socket setupo
var io = socket(server);

// This is gonna listen for socket connection from client
io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    socket.on('colorchange', function(data) {
        //console.log('Got Color Change request ', data)
        io.sockets.emit('colorchange', data);
    })
});