let fs = require('fs');

fs.readFile('input.txt', (_err, data) => {
    let lines = data.toString().split('\n');
    let leftNums = [];
    let rightNums = [];
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        let lineStr = lines[lineIdx];
        let nums = lineStr.split('   ');
        leftNums.push(parseInt(nums[0]));
        rightNums.push(parseInt(nums[1]));
    }
    leftNums.sort((a, b) => a - b);
    rightNums.sort((a, b) => a - b);
    let totalDistance = 0;
    for (let i = 0; i < leftNums.length; i++) {
        totalDistance += (Math.abs(leftNums[i] - rightNums[i]));
    }
    console.log(totalDistance);
});