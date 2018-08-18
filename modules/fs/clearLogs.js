const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');
const ms1Day = 24 * 60 * 60 * 1000;
const files = fs.readdirSync(dirname);

files.forEach(file => {
    const filePath = path.join(dirname, file);
    fs.stat(filePath, (err, stats) => {
        if(err) {
            throw err;
        }
        
        if(shouldBeRemoved(stats)) {
            fs.unlink(filePath, (err) => {
                if(err) {
                    throw err;
                }
                console.log(`deleted ${filePath}`);
            })
        }
    });
});

function shouldBeRemoved(stats) {
    const howOld = Date.now() - stats.mtime.getTime();
    return howOld > 7 * ms1Day;
}