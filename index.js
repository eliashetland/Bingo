const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;



app.use(express.static('public'))
const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock)=> {
    sock.on('message', (text)=> {
        io.emit('message', text)
    });

});


server.on('error', (err)=>{
    console.log('server error:', err)
});

server.listen(port, () => {
    console.log(`listening at ${port}`)
});




