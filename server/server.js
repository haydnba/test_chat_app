const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', (socket) => {
    console.log('Client disconnected');
  });
  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hey. What is going on.',
    createdAt: 123
  });
  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });
});

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
