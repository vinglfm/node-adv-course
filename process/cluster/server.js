const http = require('http');
const pid = process.pid;
let users = 0;

http.createServer((req, res) => {
    for(let i = 0; i < 1e7; i++);
    res.write(`Handled by process ${pid}\n`);
    res.end(`users: ${users}`);
}).listen(8080, () => {
    console.log(`Started process ${pid}`);
});

process.on('message', (message) => {
    users = message.users;
});