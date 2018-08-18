const fs = require('fs');
const util = require('util');
const EventEmitter = require('events');
// const assert = require('assert');
const out = fs.createWriteStream('./out.log');
const err = fs.createWriteStream('./err.log');

const console2 = new console.Console(out, err);

setInterval(function() {
    console2.log(new Date());
    console2.error(new Error(`Error on ${new Date().toLocaleString()}`));
}, 3800);

console.log('One %s %d %j', 'string', 1, {"node": 1});

console.log(util.inspect(global, {depth: 1}));

console.dir(global, {depth: 0});

console.assert(3 === 8);

// assert.ifError(false);

console.trace('heres');

console.time('test');
console.timeEnd('test');

const debuglog = util.debuglog('web');
debuglog('Request');

util.depricate(function() {
    for(let i = 0, len = arguments.length; i < len; ++i) {
        process.stdout.write(arguments[i] + '\n');
    }
}, 'Use console.log instead');

//Old way
function CustomEmitter() {};
util.inherits(CustomEmitter, EventEmitter);
CustomEmitter.prototype.write = function(data) {
    this.emit('data', data);
}

//new Way
class NewCustomEmitter extends EventEmitter {
    constructor() {
        super();
    }

    write(data) {
        this.emit('data', data);
    }
}