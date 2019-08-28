// client.ts

import io from 'socket.io-client';
import axios from 'axios';
import https from 'https';


const server_name = 'https://localhost:8005';

const socket = io(server_name);

const agent = new https.Agent({
  rejectUnauthorized: false
});

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

function stop_socket () {
  socket.close();
}


//////////////////////////////////
// REST client
//////////////////////////////////


//axios.get(server_name + '/group_result', { httpsAgent: agent })
//  .then(function (response) {
//    // handle success
//    console.log(response.data);
//  })
//  .catch(function (error) {
//    // handle error
//    console.log(error);
//  })
//  .then(function () {
//    // always executed
//    console.log('the end of the GET')
//  });

async function get_result () {
  try {
    const response = await axios.get(server_name + '/group_result', { httpsAgent: agent });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  console.log('the end2 of the GET')
}


//////////////////////////////////
// play a scenario
//////////////////////////////////

console.log('client.ts says Hello!');

setTimeout(get_result, 1000);
setTimeout(get_result, 2000);
setTimeout(get_result, 3000);

setTimeout(stop_socket, 3500);

function end_of_script () {
  console.log('client.ts says Bye!');
};
setTimeout(end_of_script, 4000);

