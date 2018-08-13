const server = require('net').createServer();

let currentId = 0;
const sockets = {};

server.on('connection', socket => {
    socket.id = currentId++;
    sockets[socket.id] = socket;

    console.log(`Client ${socket.id} connected`);
    socket.write(`New client ${socket.id} connected\n`);

    socket.on('data', data => {
        Object.entries(sockets).forEach(([, clientSocket]) => {
            clientSocket.write(`${socket.id}: ${data}`);
        });
    });

    socket.setEncoding('utf8');

    socket.on('end', () => {
        delete(sockets[socket.id]);
        console.log(`Client ${socket.id} disconnected`);
    });

    socket.on('error', (error) => {
        console.log(error);
        process.exit(1);
    });
});

server.listen(8000, () => console.log('Server listen on port 8000'));
