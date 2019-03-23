var express = require('express');
var app = express();
var socket = require('socket.io');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html')
})
var server = app.listen(4000, () => console.log("server started on port 4000"))

var io = socket(server);

io.on('connection', (socket) => {
    console.log('usee connected now');

    socket.on('message', (data) => {
        io.sockets.emit('message', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})


