const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

const botName = 'bot';

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontEnd')));

io.on('connection', socket => {
  socket.on('join', ({ username }) => {
    socket.emit('message', formatMessage(botName, 'welcome to chat app'));

    socket.broadcast.emit(
      'message',
      formatMessage(botName, `${username} has joined the chat`)
    );
    socket.on('chatMessage', msg => {
      io.emit('message', formatMessage(`${username}`, msg));
    });
    socket.on('disconnect', () => {
      io.emit(
        'message',
        formatMessage(botName, `${username} has left the chat`)
      );
    });
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;
