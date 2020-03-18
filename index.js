const express = require('express')()
const http = require('http').createServer(express)
const io = require('socket.io')(http)

express.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat-message', (message) => {
        socket.broadcast.emit('chat-message', {message, type : 1})
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('stopTyping', (data) => {
        socket.broadcast.emit('stopTyping', data)
    })

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', data)
    })

    socket.on('leaved', (data) => {
        socket.broadcast.emit('leaved', data)
    })
})

http.listen(3000, () => {
    console.log("server running");
})