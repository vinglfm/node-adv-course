const {exec, execFile} = require('child_process');

exec('dir', (err, stdout, stderr) => {//find . -type f | wc -l
    if(err) {
        throw err;
    }

    console.log(`Results:\n ${stdout}`);
});

// execFile('script.fl');