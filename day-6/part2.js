const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const groups = content.split('\n\n').filter(x => x);

const countDifferentAnswersPerGroup = group => {
    const answers = {};
    const peoples = group.split('\n').filter(x => x)
    
    for (const peopleAnswers of peoples) {
        const encounteredAnswer = [];

        for (const answer of peopleAnswers.split('')) {
            if (!encounteredAnswer.includes(answer)) {
                answers[answer] = (answers[answer] || 0) + 1;
                encounteredAnswer.push(answer)
            }
        }
    }

    console.log(answers)

    return Object
        .keys(answers)
        .filter(answer => answers[answer] === peoples.length)
        .length
}

const answersPerGroup = groups.map(countDifferentAnswersPerGroup)

console.log('The sum of people answer groups is', answersPerGroup.reduce((acc, item) => acc + item, 0))
