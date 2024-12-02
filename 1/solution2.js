let fs = require('fs');

fs.readFile('input.txt', (_err, data) => {
    let similarityScore = 0;
    let lines = data.toString().split('\n');
    let leftNums = [];
    let rightNums = [];
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        let lineStr = lines[lineIdx];
        let nums = lineStr.split('   ');
        leftNums.push(parseInt(nums[0]));
        rightNums.push(parseInt(nums[1]));
    }
    for (let lNum of leftNums) {
        let count = 0;
        for (let rNum of rightNums) {
            if (rNum === lNum) {
                count++;
            }
        }
        similarityScore += (lNum * count);
    }
    console.log(similarityScore);
});