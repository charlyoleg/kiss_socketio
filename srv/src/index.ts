// index.ts
//

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// WARNING: app.listen(80) will NOT work here!
server.listen(8005, function () {
   //console.log(server.address());
   var host = server.address().address;
   var port = server.address().port;
   //console.log("In your browser, open http://%s:%s", host, port);
   console.log("In your browser, open http://localhost:%s", port);
});


//////////////////////////////
// global variables
//////////////////////////////

let total_contribution: number = 0;


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

app.post('/contribute', jsonParser, function (req: any, res: any) {
  console.log(req.body);
  let contrib_n : number = parseFloat(req.body.contrib);
  total_contribution += contrib_n;
  let r_resp= {total: total_contribution, contrib: contrib_n};
  //console.log(r_resp);
  res.end(JSON.stringify(r_resp));
});

app.get('/group_result', function (req: any, res: any) {
  let r_group_result = {total: total_contribution};
  console.log(r_group_result);
  res.json(r_group_result);
});


//////////////////////////////
// websocket service
//////////////////////////////

io.on('connection', function (socket: any) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data: any) {
    console.log(data);
  });
});

