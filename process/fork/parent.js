const { fork } = require('child_process');
const forked = fork('./process/fork/child.js');

forked.on('message', (message) => {
    console.log('Message from child', message);
});

forked.send({hello: 'world'});