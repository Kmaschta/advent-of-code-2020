const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const rawPassports = content.split('\n\n').filter(x => x);

const parsePassport = (raw) => {
    const fields = raw.split(/\s/g);
    
    return fields.reduce((acc, item) => {
        const [field, value] = item.split(':');
        acc[field] = value;
        return acc;
    }, {})
}

const passports = rawPassports.map(parsePassport);

const REQUIRED_FIELD = [
    'byr', // (Birth Year)
    'iyr', // (Issue Year)
    'eyr', // (Expiration Year)
    'hgt', // (Height)
    'hcl', // (Hair Color)
    'ecl', // (Eye Color)
    'pid', // (Passport ID)
    // 'cid', // (Country ID)
]

const isValidPassport = passport => {
    for (const requiredField of REQUIRED_FIELD) {
        if (!passport[requiredField]) {
            return false;
        }
    }

    return true;
}

const validPassports = passports.filter(isValidPassport);

console.log('Number of valid passports', validPassports.length)
