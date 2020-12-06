const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = content.split('\n').filter(x => x);

const rowToBinary = row => row.replace(/F/g, '0').replace(/B/g, '1');
const columnToBinary = col => col.replace(/R/g, '1').replace(/L/g, '0');

const parseSeat = line => ({
    row: parseInt(rowToBinary(line.substring(0, 7)), 2),
    column: parseInt(columnToBinary(line.substring(7)), 2)
})

const getSeatId = ({ row, column }) => row * 8 + column;

const seats = lines.map(parseSeat)
const filledSeatIds = seats.map(getSeatId)
const highestSeatId = filledSeatIds.reduce((cursor, seatId) => seatId > cursor ? seatId : cursor, 0)

console.log('Highest Seat ID is', highestSeatId);

const allSeatIds = [];

const range = length => Array.from({ length }).map((_, i) => i)

for (const row of range(128)) {
    for (const column of range(8)) {
        allSeatIds.push(getSeatId({ row, column }))
    }
}

const unfilledSeatIds = allSeatIds.filter(id => !filledSeatIds.includes(id))

for (const unfilledSeatId of unfilledSeatIds) {
    const previous = unfilledSeatId - 1;
    const next = unfilledSeatId + 1;

    if (filledSeatIds.includes(previous) && filledSeatIds.includes(next)) {
        console.log('Your seat ID is', unfilledSeatId)
        break;
    }
}
