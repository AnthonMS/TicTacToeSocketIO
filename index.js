var express = require('express');
var socket = require('socket.io');

var nameArray = new Array();
var idArray = new Array();

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
    //console.log('Made socket connection', socket.id);

    socket.on('getarrays', function (data) {
        console.log(socket.id + ' connected');
        socket.emit('getarrays', {
            namearray: nameArray,
            idarray: idArray
        });
    });

    socket.on('newuser', function (data) {
        //console.log(data.name + ' ' + socket.id);
        nameArray.push(data.name);
        idArray.push(data.id);
        io.sockets.emit('newuser', data);
    })

    socket.on('disconnect', function() {
        //console.log(socket.id + ' disconnected...')
        for (let i = 0; i < idArray.length; i++)
        {
            let id = idArray[i];
            if (id == socket.id)
            {
                //console.log('number ' + i + ' spliced');
                idArray.splice(i, 1);
                nameArray.splice(i, 1);
                io.sockets.emit('splicearrays', i);
            }
        }
    });

    socket.on('challenge', function(data) {
        //console.log(data);
        socket.broadcast.to(data.challengedid).emit('challenged', data);
    });

    socket.on('accept_challenge', function(data) {
        //console.log(data);
        // Send data to guy accepting challenge
        //socket.emit('accept_challenge', data);
        socket.emit('you_accept_challenge', {
            opponame: data.challenger,
            oppoid: data.challengerid,
            username: data.challenged,
            userid: data.challengedid
        });

    });

    socket.on('startgame', function (data) {
        //console.log(data);
        socket.broadcast.to(data.userid).emit('other_accept_challenge', data);
    });

    socket.on('colclick', function (data) {
        //console.log(data);
        socket.broadcast.to(data.id).emit('colclick_activate', data);
        socket.emit('colclick_deactivate', data);
    });

});






























