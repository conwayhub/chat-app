const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontEnd")));

//run when client connects
io.on("connection", socket => {
  //welcome user
  socket.emit("message", "welcome to chat-app");
  //broadcast when user connects
  socket.broadcast.emit("message", "a user has joined the chat");
  //runs when user disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  //listen for chatMessage
  socket.on("chatMessage", msg => {
    io.emit("message", msg);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;
