const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);
const routes = require('./routes');

const users = {};

app.use(express.static('./public'));
app.use('/',routes);

io.on('connection',(socket)=>{
    socket.on('new-user',(name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-name',name);
    });
    socket.on('send-message',(message)=>{
        socket.broadcast.emit('private-message',{message : message , name : users[socket.id]});
    });
});

http.listen(3000,()=>{
    console.log("Listening on port : 3000");
});