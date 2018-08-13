const server = require('net').createServer();

server.on('connection', socket => {
    console.log('Client connected');
    socket.write('New client connected\n');

    socket.on('data', data => {
        console.log('data is:', data);
        socket.write('data is: ');
        socket.write(data);
    });

    socket.setEncoding('utf8');

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (error) => {
        console.log(error);
        process.exit(1);
    });
});

server.listen(8000, () => console.log('Server listen on port 8000'));
