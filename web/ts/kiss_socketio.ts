// kiss_socketio.to

import * from socket.io/socket.io.js

var socket = io.connect('http://localhost:8005');
socket.on('news', function (data: any) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
