const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = content.split('\n').filter(x => x);

const parseColumns = line => line.split('');

const matrix = lines.map(parseColumns);
const width = matrix[0].length;

const getItemAtPosition = (x, y) => matrix[y][x % width];

let position = { x: 0, y: 0 };
let treeNumber = 0;

while (position.y < matrix.length) {
    const item = getItemAtPosition(position.x, position.y);

    if (item === '#') {
        treeNumber += 1;
    }

    position = { x: position.x + 3, y: position.y + 1 }
}

console.log('Number of trees', treeNumber)
