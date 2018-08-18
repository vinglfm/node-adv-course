const fs = require('fs');
const file = fs.createWriteStream('./big.fl');

for(let i = 0; i<1e6; i++) {
    file.write('Loren ipsum dsadasdsaads');
}

file.end();