let fs = require('fs');

let xmas = ['X', 'M', 'A', 'S'];

fs.readFile('input.txt', (_err, data) => {
    console.log(findHorizontalMatches(data) + findVerticalMatches(data) + findDaigonalMatches(data));
});

function findHorizontalMatches(data) {
    let lines = data.toString().split('\n');
    let total = 0;
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        let lineStr = lines[lineIdx];
        let xmasRegex = RegExp(/XMAS/g);
        let xmasMatches = lineStr.match(xmasRegex);
        if (xmasMatches) {
            total += xmasMatches.length;
        }
        let samxRegex = RegExp(/SAMX/g);
        let samxMatches = lineStr.match(samxRegex);
        if (samxMatches) {
            total += samxMatches.length;
        }
    }
    return total;
}

function findVerticalMatches(data) {
    let transposedData = transposeData(data);
    return findHorizontalMatches(transposedData);
}

function transposeData(data) {
    let rows = data.toString().split('\n');
    let columns = rows.map(row => row.split(''));
    let transposed = columns[0].map((_, colIndex) => columns.map(row => row[colIndex]));
    let outputData = transposed.map(row => row.join('')).join('\n');
    return outputData;
}

function findDaigonalMatches(data) {
    let total = 0;
    let rows = data.toString().split('\n');
    let rowLength = rows[0].length;
    for (let j = 0; j < rows.length; j++) {
        for (let i = 0; i < rowLength; i++) {
            if (checkDiagonal(rows, rowLength, i, j, 'left')) total++;
            if (checkDiagonal(rows, rowLength, i, j, 'right')) total++;
        }
    }
    return total;
}

function checkDiagonal(rows, rowLength, i, j, direction) {
    let checkArr = [];
    checkArr.push(rows[j].charAt(i));
    let xPos = 0;
    for (let k = 1; k <= 3; k++) {
        if (direction === 'left') xPos = i - k;
        else if (direction === 'right') xPos = i + k;
        if (validPosition(xPos, j + k, rowLength, rows.length)) {
            checkArr.push(rows[j + k].charAt(xPos));
        } else {
            checkArr.push(null);
        }
    }
    if (foundXmas(checkArr, xmas) || foundXmas(checkArr, xmas.reverse())) {
        return true;
    }
}

function foundXmas(checkArr, against) {
    for (let i = 0; i < checkArr.length; i++) {
        if (checkArr[i] !== against[i]) {
            return false;
        }
    }
    return true;
}

function validPosition(x, y, maxX, maxY) {
    return x >= 0 && x < maxX && y >= 0 && y < maxY;
}