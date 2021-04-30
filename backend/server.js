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
    io.emit('chat message', "Usuario desconectado");
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
    socket.leave(data.room)
  });
});

server.listen(port);
console.log("Server running in " + port)