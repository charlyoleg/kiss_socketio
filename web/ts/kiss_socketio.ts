// kiss_socketio.to

// @ts-ignore
//import * as zog from '/socket.io/socket.io.js';

const server_name: String = 'http://localhost:8005';

/////////////////////////////////////////
// Http Rest Api
/////////////////////////////////////////

function sendPoints () {
  let point_contribution  = (<HTMLInputElement>document.querySelector('#quantity_in')).value;
  console.log("Send a contribution of " + point_contribution + " points.");
  let post_payload =  {contrib: point_contribution};
  fetch('http://localhost:8005/contribute', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(post_payload),
    })
}

function askResult () {
  fetch('http://localhost:8005/group_result')
    .then((res) => { // http response
      if (res.ok) {
        return res.text(); // consuming the http body
      }
      throw new Error('Network response was not ok.');
    }).then((resText) => {
      console.log('fetch response text: ', resText);
      let current_result = parseInt(resText);
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

//var socket = io.connect('http://localhost:8005');
//socket.on('news', function (data: any) {
//  console.log(data);
//  socket.emit('my other event', { my: 'data' });
//});

