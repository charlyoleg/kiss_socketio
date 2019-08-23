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

//////////////////////////////
// serving files
//////////////////////////////

app.get('/', function (req: any, res: any) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/js/kiss_socketio.js', function (req: any, res: any) {
  res.sendFile(__dirname + '/kiss_socketio.js');
});

app.get('/css/kiss_socketio_style.css', function (req: any, res: any) {
  res.sendFile(__dirname + '/kiss_socketio_style.css');
});

//////////////////////////////
// rest api
//////////////////////////////


//////////////////////////////
// websocket service
//////////////////////////////
io.on('connection', function (socket: any) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data: any) {
    console.log(data);
  });
});

