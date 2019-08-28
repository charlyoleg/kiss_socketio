// client.js

import io from 'socket.io-client';
//import axios from 'axios';

const socket = io('http://localhosti:8005');


//////////////////////////////////
// register the listened events
//////////////////////////////////

socket.on('update result', function (event_data: any) {
  let current_result: number = parseFloat(event_data.total);
  console.log("event_result: " + current_result);
});

socket.on('connect', function (event_data: any) {
  console.log('socketio connecting. event_data: ', event_data);
});

socket.on('disconnect', function (event_data: any) {
  console.log('socketio disconnecting. event_data: ', event_data);
});


//////////////////////////////////
// play a scenario
//////////////////////////////////


