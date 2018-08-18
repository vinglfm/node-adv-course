const fs = require('fs');

fs.readFile(__filename, (err, data) => {
    if(err) {
        throw err;
    }
});

try {
const data = fs.readFileSync(__filename);
} catch(err) {
    console.log(err);
}

