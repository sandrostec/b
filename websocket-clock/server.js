const WebSocket = require('ws');

// Crie o servidor WebSocket
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', (ws) => {
    let countdown = 60;

    const timer = setInterval(() => {
        if (countdown >= 0) {
            ws.send(JSON.stringify({ time: countdown }));
            countdown--;
        } else {
            clearInterval(timer);
        }
    }, 1000); // Envia o tempo a cada segundo

    ws.on('close', () => {
        clearInterval(timer);
    });
});
