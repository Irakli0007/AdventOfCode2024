let fs = require('fs');
//part one merged into part two, lost the part one code

let totalSafeReports = 0;
fs.readFile('input.txt', (_err, data) => {
    let lines = data.toString().split('\n');
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        let lineStr = lines[lineIdx];
        let lineNums = lineStr.split(' ').map(Number);
        removeOneLoop(lineNums);
    }
    console.log(totalSafeReports);
});

function removeOneLoop(nums) {
    for (let idx = 0; idx < nums.length; idx++) {
        let newNums = nums.slice(0, idx).concat(nums.slice(idx + 1));
        if (checkSafety(newNums, checkIncreasing(newNums[0], newNums[1]))) {
            totalSafeReports++;
            break;
        }
    }
}

function checkSafety(nums, isIncreasing) {
    for (let i = 0; i < nums.length - 1; i++) {
        let one = nums[i];
        let two = nums[i + 1];
        let difference = Math.abs(one - two);
        if ((isIncreasing === true && one > two) ||
            (isIncreasing === false && one < two) ||
            (difference === 0) || (difference >= 4)) {
            return false;
        }
    }
    return true;
}

function checkIncreasing(first, second) {
    return first === second ? null : first < second ? true : false;
}