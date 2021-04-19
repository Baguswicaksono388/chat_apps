const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('create-room', name=>{
    console.log('Then room name received is ', name);
  });

  socket.on("ping", function (inData) {
    console.log("ping received");
    socket.emit("pong", { });
  });
  socket.emit("connected",);
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});