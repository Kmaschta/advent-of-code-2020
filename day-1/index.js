const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const rawInputs = content.split('\n');
const inputs = rawInputs.filter(x => x).map(input => parseInt(input, 10));

for (const input1 of inputs) {
   for (const input2 of inputs) {
       for (const input3 of inputs) {
           const result = input1 + input2 + input3;
           console.log(input1, '+', input2, '+', input3, '=', result);
    
           if (result === 2020) {
               console.log('Found it!', input1 * input2 * input3)
               process.exit(0);
           }
       }
   } 
}
