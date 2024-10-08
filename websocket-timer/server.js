const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Erro ao carregar index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('404 Not Found');
    }
});

// Crie o servidor WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');
    let countdown = 60;

    const timer = setInterval(() => {
        if (countdown >= 0) {
            ws.send(JSON.stringify({ time: countdown }));
            countdown--;
        } else {
            clearInterval(timer);
            ws.send(JSON.stringify({ message: 'Timer finished' }));
        }
    }, 1000); // Envia o tempo a cada segundo

    ws.on('close', () => {
        clearInterval(timer);
        console.log('Cliente desconectado');
    });
});

// O servidor HTTP deve escutar em uma porta especificada
const PORT = 8080; // Defina a porta como 8080 ou outra de sua escolha
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
