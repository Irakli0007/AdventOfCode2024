let fs = require('fs');

fs.readFile('input.txt', (_err, data) => {
    let total = 0;
    let regex = RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g);
    const matches = data.toString().match(regex);
    for (let match of matches) {
        let parts = match.split(',');
        let first = parts[0].substring(4, parts[0].length);
        let second = parts[1].substring(0, parts[1].length - 1);
        total += first * second;
    }
    console.log(total);
});