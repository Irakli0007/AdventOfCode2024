let fs = require('fs');

let operators = ['+', '*'];

fs.readFile('input.txt', (_err, data) => {
    let total = 0;
    let lines = data.toString().split('\n');
    for (let line of lines) {
        let answer = parseInt(line.split(':')[0]);
        let numbers = line.split(':')[1].trim().split(' ').map(Number);
        let operatorPositions = numbers.length - 1;
        let c = [];
        for (let j = 0; j < operatorPositions; j++) {
            c.push(operators);
        }
        const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
        let combinations = cartesian(...c);
        for (let j = 0; j < combinations.length; j++) {
            let lineAnswer = numbers.reduce((a, b, i) => {
                if (combinations[j][i - 1] === '+') {
                    return a + b;
                } else if (combinations[j][i - 1] === '*') {
                    return a * b;
                }
                return 0;
            });
            if (lineAnswer === answer) {
                total += answer;
                break;
            }
        }
    }
    console.log(total);
});