const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res)=>  {
    // fs.readFile('big.fl', (err, data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     res.end(data);
    // });

    const src = fs.createReadStream('./big.fl');
    src.pipe(res);
});

server.listen(8000);