// kiss_socketio.to

// @ts-ignore
//import * as zog from '/socket.io/socket.io.js';
//import io from 'socket.io-client';

const server_name: string = 'http://localhost:8005';

/////////////////////////////////////////
// Http Rest Api
/////////////////////////////////////////

function sendPoints () {
  let point_contribution  = (<HTMLInputElement>document.querySelector('#quantity_in')).value;
  console.log("Send a contribution of " + point_contribution + " points.");
  let post_payload =  {contrib: point_contribution};
  fetch(server_name + '/contribute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_payload)
    }).then((res) =>  {
      if (res.ok) {
        return res.json();
      }
      throw new Error('ERR026: Network response was not ok.');
    }).then((resJson) => {
      console.log('POST successful with response: ' + JSON.stringify(resJson));
    }).catch((err) => {
      console.log('ERR030: POST with error:', err);
    });
}

function askResult () {
  fetch(server_name + '/group_result')
    .then((res) => { // http response
      if (res.ok) {
        return res.text(); // consuming the http body
      }
      throw new Error('Network response was not ok.');
    }).then((resText) => {
      //console.log('fetch response text: ', resText);
      let resJson = JSON.parse(resText);
      let current_result: number = parseFloat(resJson.total);
      console.log("current_result: " + current_result);
      (<HTMLParagraphElement>document.querySelector('#pull_quantity_out')).innerHTML = current_result.toString();
    }).catch(function (error) {
      console.log('Failing fetch operation: ', error.message);
    });
}

(<HTMLButtonElement>document.querySelector('#button_send')).addEventListener('click', sendPoints);
(<HTMLButtonElement>document.querySelector('#button_ask')).addEventListener('click', askResult);


/////////////////////////////////////////
// WebSocket
/////////////////////////////////////////

const socket = io.connect(server_name);
socket.on('news', function (data: any) {
  console.log(data);
  socket.emit('my other event', { my: 'bonjour' });
});

