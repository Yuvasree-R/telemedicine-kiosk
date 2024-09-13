const express = require('express');
const { Server } = require('ws');
const router = express.Router();

// WebSocket server for video conferencing
const wss = new Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Doctor-Patient connection established');

    ws.on('message', (message) => {
        wss.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });
});

router.ws('/connect', (ws, req) => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (client) => {
        wss.emit('connection', client, req);
    });
});

module.exports = router;
