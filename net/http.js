const server = require('http').createServer();

server.on('request', (req, res) => {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('Hello world\n');

    setTimeout(function() {
        res.write('Another Hello world\n');
    }, 1000);

    setTimeout(function() {
        res.end('Hey');
    }, 6500);
});
server.timeout = 1000;//default timeout is 2 min

server.listen(8000);