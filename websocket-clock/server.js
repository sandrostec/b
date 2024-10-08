const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    let countdown = 1000; // Define o contador regressivo inicial

    // Enviar a contagem regressiva a cada segundo
    const interval = setInterval(() => {
        if (countdown >= 0) {
            ws.send(countdown); // Envia o valor atual do contador
            countdown--;
        } else {
            clearInterval(interval); // Para o contador quando chegar a 0
        }
    }, 1000);

    ws.on('close', () => {
        clearInterval(interval); // Para o intervalo caso o cliente feche a conexão
    });
});



console.log("Servidor WebSocket rodando na porta 8080");
