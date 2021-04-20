const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const PORT = process.env.PORT || 5000;
const { addUser } = require('./helper');

const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('create-room', name=>{
    console.log('Then room name received is ', name);
  });
  socket.on('join', ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id
    });
    if (error) {
      console.log('join error', error)
    } else {
      console.log('join user', user)
    }
  })
  socket.on("ping", function (inData) {
    console.log("ping received");
    socket.emit("pong", { });
  });
  socket.emit("connected",);
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});