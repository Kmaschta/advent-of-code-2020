const fs = require('fs');
const path = require('path');
const { cpuUsage } = require('process');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const rawPassports = content.split('\n\n').filter(x => x);

const parsePassport = (raw) => {
    const fields = raw.split(/\s/g);
    
    return fields.filter(x => x).reduce((acc, item) => {
        const [field, value] = item.split(':');
        acc[field] = value;
        return acc;
    }, {})
}

const passports = rawPassports.map(parsePassport);

const composeValidators = (fns) => (...args) =>
    fns.reduce((valid, fn) => {
        if (!valid) {
            return false;
        }

        return fn(...args);
    }, true);

const hasNumberChars = (number) => value => {
    if (value.length !== number) {
        return false
    }

    return true
}

const minValue = (min) => value => {
    const number = parseInt(value, 10);
    return number >= min ? true : false;
}

const maxValue = (min) => value => {
    const number= parseInt(value, 10);
    return number <= min ? true : false;
}

const hasValidHeight = (value) => {
    const number = value.substring(0, value.length - 2);

    if (value.endsWith('cm')) {
        return minValue(150)(number) && maxValue(193)(number);
    }

    if (value.endsWith('in')) {
        return minValue(59)(number) && maxValue(76)(number);
    }

    return false;
}

const HAIR_COLOR_REGEX = /^#[0-9a-f]{6}$/;
const hasValidHairColor = value => value.match(HAIR_COLOR_REGEX);

const hasValidEyeColor = value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);

const FIELDS_VALIDATORS = {
    byr: [hasNumberChars(4), minValue(1920), maxValue(2002)],
    iyr: [hasNumberChars(4), minValue(2010), maxValue(2020)],
    eyr: [hasNumberChars(4), minValue(2020), maxValue(2030)],
    hgt: [hasValidHeight],
    hcl: [hasNumberChars(7), hasValidHairColor],
    ecl: [hasValidEyeColor],
    pid: [hasNumberChars(9)]
}

const REQUIRED_FIELD = Object.keys(FIELDS_VALIDATORS)

const isValidPassport = passport => {
    for (const field of REQUIRED_FIELD) {
        if (!passport[field]) {
            return false;
        }

        const validate = composeValidators(FIELDS_VALIDATORS[field])

        if (!validate(passport[field])) {
            return false
        }
    }

    return true;
}

const validPassports = passports.filter(isValidPassport);

console.log('Number of valid passports', validPassports.length)
