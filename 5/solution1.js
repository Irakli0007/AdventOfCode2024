let fs = require('fs');

fs.readFile('input.txt', (_err, data) => {
    let total = 0;
    let dataParts = data.toString().split('\n\n');
    let rules = dataParts[0].split('\n');
    let updates = dataParts[1].split('\n');
    for (let updateIdx = 0; updateIdx < updates.length; updateIdx++) {
        let update = updates[updateIdx];
        if (correctOrder(update, rules)) {
            let updateArr = update.split(',').map(Number);
            total += updateArr[Math.floor(updateArr.length / 2)];
        }
    }
    console.log(total);
});

function correctOrder(update, rules) {
    for (let i = 0; i < rules.length; i++) {
        let first = update.indexOf(rules[i].split('|')[0]);
        let second = update.indexOf(rules[i].split('|')[1]);
        if (first !== -1 && second !== -1 && first > second) {
            return false;
        }
    }
    return true;
}