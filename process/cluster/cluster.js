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

    updateWorkers();
    setInterval(updateWorkers, 15000);
} else {
    require('./server');
}