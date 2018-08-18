const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');
const files = fs.readdirSync(dirname);

const logWithTime = (message) => {
    console.log(`${new Date().toUTCString()}: ${message}`);
}

fs.watch(dirname, (eventType, filename) => {
    if(eventType === 'rename') {//add or delete
        const index = files.indexOf(filename);
        if(index >= 0) {
            files.slice(index, 1);
            logWithTime(`${filename} was removed`);
            return;
        }

        files.push(filename);
        logWithTime(`${filename} was added`);
        return;
    }

    logWithTime(`${filename} was changed`);
});