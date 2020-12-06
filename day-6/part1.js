const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const groups = content.split('\n\n').filter(x => x);

const countDifferentAnswersPerGroup = group => {
    const answers = {};
    const peopleAnswers = group.split('\n').filter(x => x);
    
    for (const peopleAnswer of peopleAnswers) {
        for (const answer of peopleAnswer.split('')) {
            answers[answer] = true;
        }
    }

    return Object.keys(answers).length
}

const answersPerGroup = groups.map(countDifferentAnswersPerGroup)

console.log('The sum of people answer groups is', answersPerGroup.reduce((acc, item) => acc + item, 0))
