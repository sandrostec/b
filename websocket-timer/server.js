const WebSocket = require('ws');

// Crie o servidor WebSocket
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

// Adicione um log para indicar que o servidor está em execução
wss.on('listening', () => {
    console.log(`WebSocket server is running on port ${process.env.PORT || 8080}`);
});

wss.on('connection', (ws) => {
    let countdown = 60;

    const timer = setInterval(() => {
        if (countdown >= 0) {
            ws.send(JSON.stringify({ time: countdown }));
            countdown--;
        } else {
            clearInterval(timer);
            // Enviar uma mensagem ao cliente quando a contagem regressiva terminar
            ws.send(JSON.stringify({ message: 'Timer finished' }));
        }
    }, 1000); // Envia o tempo a cada segundo

    ws.on('close', () => {
        clearInterval(timer);
    });
});

