// index.ts
//

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


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


// ####################################
// Browser security policy: Access-Control-Allow-Origin
// ####################################

/**
 * @param {module:http.ClientRequest} req
 * @param {module:http.ServerResponse} res
 */
app.use("/", (req: any, res: any, next: any) => {
  //res.header("Access-Control-Allow-Origin", "*");
  if (req.headers.origin) {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
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
  console.log('socketio connecting');
  //console.log(socket);
  //console.log(socket.client.conn);
  // send event to all clients
  socket.on('one more contribution', function (event_data: any) {
    console.log(event_data);
    let group_result = {total: total_contribution};
    socket.emit('update result', group_result);
  });
  // disconnecting
  socket.on('disconnect', function () {
    console.log('socketio disconnecting');
  });
});


//////////////////////////////
// running the server
//////////////////////////////

// WARNING: app.listen(80) will NOT work here!
server.listen(8005, function () {
   //console.log(server.address());
   var host = server.address().address;
   var port = server.address().port;
   //console.log("In your browser, open http://%s:%s", host, port);
   console.log("In your browser, open http://localhost:%s", port);
});
