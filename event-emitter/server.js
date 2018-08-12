const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor(client) {
        super();
        this.tasks = {};
        this.taskId = 1;
        process.nextTick(() => {
            this.emit('response', 'Type a command (help to list all commands)');
        });
        client.on('command', (command, args) => {
            switch(command) {
                case 'help':
                case 'add':
                case 'list':
                case 'delete':
                    this[command](args);
                    break;
                default:
                console.log(`Unknown command: ${command}`);
            }
        });
    }

    tasksToString() {
        return Object.keys(this.tasks).map(key => {
            return `${key}: ${this.tasks[key]}`;
        }).join('\n');
    }

    help() {
        this.emit('response', `Available Commands: 
        add task
        list
        delete :id`);
    }

    add(args) {
        this.tasks[this.taskId] = args.join(' ');
        this.emit('response', `Added task ${this.taskId}`);
        this.taskId++;
    }

    list() {
        this.emit('response', `Tasks:\n${this.tasksToString()}`);
    }

    delete(args) {
        delete(this.tasks[args[0]]);
        this.emit('response', `Deleted task ${args[0]}`);
    }
}

module.exports = (client) => new Server(client);