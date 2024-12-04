let fs = require('fs');

fs.readFile('input.txt', (_err, data) => {
    let total = 0;
    let rows = data.toString().split('\n');
    let rowLength = rows[0].length;
    for (let j = 0; j < rows.length; j++) {
        for (let i = 0; i < rowLength; i++) {
            if (rows[j].charAt(i) === 'A') {
                if (checkMasDiagonal(rows, rowLength, i, j)) {
                    total++;
                }
            }
        }
    }
    console.log(total);
});

function checkMasDiagonal(rows, rowLength, i, j) {
    let backSlash = false;
    let forwardSlash = false;
    if (validPosition(i - 1, j - 1, rowLength, rows.length) && (
        validPosition(i + 1, j + 1, rowLength, rows.length))) {
        let upLeft = rows[j - 1].charAt(i - 1);
        let bottomRight = rows[j + 1].charAt(i + 1);
        if ((upLeft === 'M' || upLeft === 'S') &&
            (bottomRight === 'M' || bottomRight === 'S') &&
            (upLeft !== bottomRight)) {
            backSlash = true;
        }
    }
    if (validPosition(i + 1, j - 1, rowLength, rows.length) && (
        validPosition(i - 1, j + 1, rowLength, rows.length))) {
        let upRight = rows[j - 1].charAt(i + 1);
        let bottomLeft = rows[j + 1].charAt(i - 1);
        if ((upRight === 'M' || upRight === 'S') &&
            (bottomLeft === 'M' || bottomLeft === 'S') &&
            (upRight !== bottomLeft)) {
            forwardSlash = true;
        }
    }
    return backSlash && forwardSlash;
}

function validPosition(x, y, maxX, maxY) {
    return x >= 0 && x < maxX && y >= 0 && y < maxY;
}