const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;



app.use(express.static('public'))
const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock)=> {

    sock.on('join_room', room =>{
        sock.join(room);
        console.log(room);
    });


    sock.on('message', ({brukt, room}) => {
        sock.to(room).emit('message', brukt);
        // io.emit('message', brukt) bruk denne for å kun ha ett rom
    });

});


server.on('error', (err)=>{
    console.log('server error:', err)
});

server.listen(port, () => {
    console.log(`listening at ${port}`)
});




