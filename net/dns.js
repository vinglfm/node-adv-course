const dns = require('dns');

//uses libuv, not network connection
dns.lookup('pluralsight.com', (err, address) => {
    console.log(`lookup: ${address}`);
});

dns.resolve4('pluralsight.com', (err, address) => {
    console.log(`resolve4: ${address}`);
});

dns.resolveMx('pluralsight.com', (err, address) => {
    console.log(`resolveMx: ${JSON.stringify(address)}`);
});

dns.resolve('pluralsight.com', 'MX', (err, address) => {
    console.log(`resolve Mx param: ${JSON.stringify(address)}`);
});

dns.reverse('52.71.254.79', (err, hostname) => {
    console.log(`reverse ${hostname}`);
});