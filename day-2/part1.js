const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = content.split('\n').filter(x => x);

const parseLine = (line) => {
    const [policy, password] = line.split(':');
    const [instructions, letter] = policy.split(' ');
    const [min, max] = instructions.split('-').map(limit => parseInt(limit, 10))

    return {
        password: password.trim(),
        letter,
        min,
        max
    }
}

const countOccurencesInString = (str, element) => {
    const regex = new RegExp(element, 'g');
    return (str.match(regex) || []).length;
}

let validPasswords = 0;

for (const line of lines) {
    const { password, letter, min, max } = parseLine(line);

    const occurences = countOccurencesInString(password, letter);

    if (occurences >= min && occurences <= max) {
        validPasswords += 1;
    }
}

console.log('Valid passwords', validPasswords)
