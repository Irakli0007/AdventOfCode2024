let fs = require('fs');

fs.readFile('input.txt', (_err, data) => {
    let total = 0;
    let dataParts = data.toString().split('\n\n');
    let rules = dataParts[0].split('\n');
    let updates = dataParts[1].split('\n');
    for (let updateIdx = 0; updateIdx < updates.length; updateIdx++) {
        let update = updates[updateIdx];
        let rulesArray = createSortedRulesArray(rules, update);
        if (!correctOrder(update, rules)) {
            let middle = parseInt(getMiddleOfFixedUpdate(update, rulesArray));
            total += middle;
        }
    }
    console.log(total);
});

function getMiddleOfFixedUpdate(update, rulesArray) {
    let fixedUpdate = [];
    let updateArr = update.split(',');
    for (let i = 0; i < rulesArray.length; i++) {
        if (updateArr.includes(rulesArray[i])) {
            fixedUpdate.push(rulesArray[i]);
        }
    }
    return fixedUpdate[Math.floor(fixedUpdate.length / 2)];
}

function createSortedRulesArray(rules, update) {
    let rulesMap = new Map();
    let rulesArray = [];
    let updates = update.split(',');
    for (let i = 0; i < rules.length; i++) {
        let first = rules[i].split('|')[0];
        let second = rules[i].split('|')[1];
        if (updates.includes(first) && updates.includes(second)) {
            if (!rulesMap.has(first)) {
                let list = [second];
                rulesMap.set(first, list)
            } else {
                let list = rulesMap.get(first);
                list.push(second);
                rulesMap.set(first, list);
            }
            if (!rulesArray.includes(first)) {
                rulesArray.push(first);
            }
            if (!rulesArray.includes(second)) {
                rulesArray.push(second);
            }
        }
    }
    rulesArray.sort((a, b) => {
        if (rulesMap.get(a) && rulesMap.get(a).includes(b)) {
            return -1;
        } else if (rulesMap.get(b) && rulesMap.get(b).includes(a)) {
            return 1;
        }
        return 0;
    });
    return rulesArray;
}


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

