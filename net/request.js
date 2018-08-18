const http = require('http');
//const https = require('http');

const request = http.request(
    {hostname: 'www.google.com'},
    (res) => {
        console.log(res.statusCode);
        console.log(res.headers);

        res.on('data', (data) => {
            console.log(data.toString());
        });
    });

    request.on('error', (err) => {
        console.log(error);
    });

    request.end();

    //http.ClientRequest
    const globalAgentRequest = http.get(
        'http://www.google.com',
        (res) => {
            //res: http.IncomingMessage
            console.log(res.statusCode);
            console.log(res.headers);
    
            res.on('data', (data) => {
                console.log(data.toString());
            });
        });
    
        globalAgentRequest.on('error', (err) => {
            console.log(error);
        });
    
        console.log(globalAgentRequest.agent);//http.agent