
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        console.log("Received message, broadcasting...")
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

// app.get('/', (req, res) => res.send('Hello World!'));
app.use(express.static('public'))

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
