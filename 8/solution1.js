let fs = require('fs');

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let matchesMap = new Map();
let antinodeMap = new Map();
let lineChars = 0;
let numLines = 0;

fs.readFile('input.txt', (_err, data) => {
    generateMatchesMap(data);
    findAntinodes();
    console.log(antinodeMap.size);
});

function generateMatchesMap(data) {
    let lines = data.toString().split('\n');
    numLines = lines.length;
    lineChars = lines[0].length;
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        let currLine = lines[lineIdx];
        for (let i = 0; i < currLine.length; i++) {
            let currChar = currLine[i];
            if (currChar !== '.' && !matchesMap.has(currChar)) {
                matchesMap.set(currChar, getMatchingChars(currChar, lineIdx, i, lines))
            }
        }
    }
}

function getMatchingChars(currChar, lineIdx, i, lines) {
    let matches = [];
    for (let k = i; k < lineChars; k++) {
        let char = lines[lineIdx][k];
        if (currChar === char) {
            const p = new Point(k, lineIdx);
            matches.push(p);
        }
    }
    for (let j = lineIdx + 1; j < numLines; j++) {
        let line = lines[j];
        for (let k = 0; k < lineChars; k++) {
            let char = line[k];
            if (currChar === char) {
                const p = new Point(k, j);
                matches.push(p);
            }
        }
    }
    return matches;
}

function findAntinodes() {
    for (let [key, value] of matchesMap) {
        for (let i = 0; i < value.length - 1; i++) {
            for (let j = i + 1; j < value.length; j++) {
                let pointOne = value[i];
                let pointTwo = value[j];
                let xDistance = Math.abs(pointOne.x - pointTwo.x);
                let yDistance = Math.abs(pointOne.y - pointTwo.y);
                let antinodeOne;
                let antinodeTwo;
                if (pointOne.x < pointTwo.x) {
                    antinodeOne = new Point(pointOne.x - xDistance, pointOne.y - yDistance);
                    antinodeTwo = new Point(pointTwo.x + xDistance, pointTwo.y + yDistance);
                } else if (pointOne.x > pointTwo.x) {
                    antinodeOne = new Point(pointOne.x + xDistance, pointOne.y - yDistance);
                    antinodeTwo = new Point(pointTwo.x - xDistance, pointTwo.y + yDistance);
                }
                if (isValidLocation(antinodeOne.x, antinodeOne.y)) {
                    let validAntinode = new Point(antinodeOne.x, antinodeOne.y);
                    antinodeMap.set(JSON.stringify(validAntinode), true);
                }
                if (isValidLocation(antinodeTwo.x, antinodeTwo.y)) {
                    let validAntinode = new Point(antinodeTwo.x, antinodeTwo.y);
                    antinodeMap.set(JSON.stringify(validAntinode), true);
                }
            }
        }
    }
}

function isValidLocation(x, y) {
    if (x < 0 || x > lineChars - 1 || y < 0 || y > numLines - 1) {
        return false;
    }
    return true;
}