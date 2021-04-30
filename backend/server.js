const port = 8080;
var server = require('http').createServer();
var io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

io.on('connection', socket => {
  socket.on('disconnect', reason => {
    console.log('user disconnected');
  });

  socket.on('room', data => {
    console.log('room join');
    socket.join(data.room);
  });

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

  socket.on('leave room', data => {
    console.log('leaving room');
    console.log(data);
    socket.leave(data.room)
  });

  socket.on('new message', data => {
    console.log(data)
    socket.broadcast
      .to(data.room)
      .emit('receive message', data)
  });
});

server.listen(port);
console.log("Server running in " + port)