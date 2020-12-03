const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = content.split('\n').filter(x => x);

const parseColumns = line => line.split('');

const matrix = lines.map(parseColumns);
const width = matrix[0].length;

const getItemAtPosition = (x, y) => matrix[y][x % width];

const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
]

let totalTreesMultiplied = 1;

for (const slope of slopes) {
    let position = { x: 0, y: 0 };
    let treeNumber = 0;

    while (position.y < matrix.length) {
        const item = getItemAtPosition(position.x, position.y);

        if (item === '#') {
            treeNumber += 1;
        }

        position = { x: position.x + slope.x, y: position.y + slope.y }
    }

    totalTreesMultiplied *= treeNumber;
}

console.log('Total trees multiplied', totalTreesMultiplied)
