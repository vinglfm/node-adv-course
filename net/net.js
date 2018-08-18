const server = require('net').createServer();

let currentId = 0;
const sockets = {};

//moment library for timestamps
function timestamp() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}

server.on('connection', socket => {
    socket.id = currentId++;    

    console.log(`Client ${socket.id} connected`);
    socket.write('Please type your name: ');

    socket.on('data', data => {
        if(!sockets[socket.id]) {
            socket.name = data.toString().trim();
            sockets[socket.id] = socket;
            socket.write(`Welcome ${socket.name}!\n`)
            return;
        }
        sockets[socket.id] = socket;
        Object.entries(sockets).forEach(([key, clientSocket]) => {
            if(socket.id == key) {
                return;
            }
            clientSocket.write(`${timestamp()} ${socket.name}: ${data}\n`);
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
