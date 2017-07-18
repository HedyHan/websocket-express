const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({port:8000})

// Broadcast to all.
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
      console.log(data)
    }
  });
};

wss.on('connection', function(ws) {
  ws.on('message', function(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
})


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(3000, () => {
  console.log(`Server running at port 3000 `);
});