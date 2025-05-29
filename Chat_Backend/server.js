const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' }});

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Escuchar cuando un usuario ingresa con su nombre
  socket.on('join', (username) => {
    socket.username = username;
    io.emit('message', { user: 'Sistema', text: `${username} se ha unido al chat` });
  });

  // Escuchar mensajes de usuarios
  socket.on('message', (msg) => {
    io.emit('message', { user: socket.username, text: msg });
  });

  // Notificar cuando un usuario se desconecta
  socket.on('disconnect', () => {
    io.emit('message', { user: 'Sistema', text: `${socket.username} ha salido del chat` });
  });
});

// Definir el puerto en el que el servidor escuchará las conexiones
const PORT = 3303;
// Iniciar el servidor y hacer que escuche en el puerto especificado
server.listen(PORT, () => {
  // Mensaje en consola para indicar que el servidor está en funcionamiento
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});