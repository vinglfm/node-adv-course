const fs = require('fs');
const path = require('path');

function readFiles(dirname, onError, onFile) {
    fs.readdir(dirname, function(err, filenames) {
        if(err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            fs.readFile(path.join(dirname, filename), 'utf-8', function(err, content) {
                if(err) {
                    onError(err);
                    return;
                }
                onFile(dirname + filename, content);
            });
        });
    });
}

readFiles('./modules/fs/data/', function(err) {
    throw err;
}, function(filePath, data) {
    const body = data.substr(0, data.length / 2);
    console.log(body);
    fs.writeFile(filePath, body, function(err) {
        if(err) {
            throw err;
        }
    });
});