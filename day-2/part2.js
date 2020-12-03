const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = content.split('\n').filter(x => x);

const parseLine = (line) => {
    const [policy, password] = line.split(':');
    const [instructions, letter] = policy.split(' ');
    const [firstPosition, secondPosition] = instructions.split('-').map(limit => parseInt(limit, 10))

    return {
        password: password.trim(),
        letter,
        firstIndex: firstPosition - 1,
        secondIndex: secondPosition - 1
    }
}

const xor = (a, b) => (a || b) && !(a && b);

let validPasswords = 0;

for (const line of lines) {
    const { password, letter, firstIndex, secondIndex } = parseLine(line);

    const doesFirstMatch = password[firstIndex] === letter;
    const doesSecondMatch = password[secondIndex] === letter;

    if (xor(doesFirstMatch, doesSecondMatch)) {
        validPasswords += 1;
    }

}

console.log('Valid passwords', validPasswords)
