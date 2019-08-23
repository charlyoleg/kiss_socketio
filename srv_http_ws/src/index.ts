// index.ts
//

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// WARNING: app.listen(80) will NOT work here!
server.listen(8005, function () {
   //console.log(server.address());
   var host = server.address().address;
   var port = server.address().port;
   //console.log("In your browser, open http://%s:%s", host, port);
   console.log("In your browser, open http://localhost:%s", port);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

