const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');

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

// Cria o servidor WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');

    const sendRandomPosition = () => {
        const x = Math.floor(Math.random() * 90); // De 0 a 90% da largura
        const y = Math.floor(Math.random() * 90); // De 0 a 90% da altura
        ws.send(JSON.stringify({ x, y }));
    };

    const intervalId = setInterval(sendRandomPosition, 1000); // Envia novas posições a cada segundo

    ws.on('close', () => {
        clearInterval(intervalId);
        console.log('Cliente desconectado');
    });
});

// O servidor HTTP deve escutar em uma porta especificada
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
