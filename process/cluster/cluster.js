const cluster = require('cluster');
const os = require('os');

const numberOfUsers = function() {
    this.count = this.count || 5;
    this.count = this.count * this.count;
    return this.count;
}

if(cluster.isMaster) {
    const cpus = os.cpus().length;
    for(let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    // console.dir(cluster.workers, {depth: 0});
    const updateWorkers = () => {
        const users = numberOfUsers();
        Object.values(cluster.workers).forEach(worker => {
            worker.send({users});
        });
    };

    cluster.on('exit', (worker, code, signal) => {
        if(code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.id} crashed. Starting a new worker...`);
            cluster.fork();
        }
    });

    // process.on('SIGUSR2', () => { //kill -SIGUSR2 master.process.pid
    //     const workers = Object.values(cluster.workers);
    //     const restartWorker = (workerIndex) => {
    //         const worker = workers[workerIndex];
    //         if(!worker) {
    //             return;
    //         }
    //         worker.on('exit', () => {
    //             if(!worker.exitedAfterDisconnect) {
    //                 return;
    //             }
    //             console.log(`Exited process ${worker.process.pid}`);
    //             cluster.fork().on('listening', () => {
    //                 restartWorker(workerIndex + 1);
    //             });
    //         });
    //         worker.disconnect();
    //     }
    //     restartWorker(0);
    // });//for linux

    updateWorkers();
    setInterval(updateWorkers, 15000);
} else {
    require('./server');
}