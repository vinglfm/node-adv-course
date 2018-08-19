(function() {
    var childProcess = require("child_process");
    childProcess.spawn = require('cross-spawn');
})(); 

const {spawn} = require('child_process');
const child = spawn('pwd');

child.stdout.on('data', (data) => {
    console.log(`child stdout: \n${data}`)
});

child.stderr.on('data', (data) => {
    console.error(`child stderr: \n${data}`)
});

child.on('exit', function(code, signal) {
    console.log(`child process exited with code: ${code} and signal: ${signal}`);
});

child.on('error', function(error) {
    console.error(`error: ${error}`);
});


const findings = spawn('find', ['.', '-type', 'f'], {
    stdio: 'inherit',
    shell: true,
    cwd: '/Users/Downloads'
});

const echos = spawn('echo $ANSWER', {
    stdio: 'inherit',
    shell: true,
    env: {ANSWER: 42}//override environment
});

const independentChild = spawn('node', ['timer.js'], {
    detached: true,
    stdio: 'ignore'
});
independentChild.unref();//parent could be terminated without a child
//other events on child: disconnect, error, message, close(on all stdio streams closed)
//stdio objects: child.stdin, child.stdout, child.stderr