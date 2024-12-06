let fs = require('fs');

let directions = ['up', 'right', 'down', 'left'];
let maxX = 0;
let maxY = 0;

fs.readFile('input.txt', (_err, data) => {
    let [positionVisitedMap, currentPosition] = generatePositionsMap(data);
    while (true) {
        let direction = getDirection();
        if (hasEscaped(currentPosition, direction)) {
            break;
        }
        if (checkNextPositionObstructed(direction, currentPosition, positionVisitedMap)) {
            let currentDirection = directions.splice(0, 1)[0].toString();
            directions.push(currentDirection);
            direction = getDirection();
        }
        let x = parseInt(currentPosition.split(',')[0]);
        let y = parseInt(currentPosition.split(',')[1]);
        x += direction.xDir;
        y += direction.yDir;
        currentPosition = x.toString() + ',' + y.toString();
        positionVisitedMap.set(currentPosition, [false, true]);
    }
    let totalVisited = 0;
    for (let values of positionVisitedMap.values()) {
        if (values[1]) {
            totalVisited++;
        }
    }
    console.log(totalVisited);
});

function hasEscaped(currentPosition, direction) {
    let x = parseInt(currentPosition.split(',')[0]);
    let y = parseInt(currentPosition.split(',')[1]);
    if (x + direction.xDir < 0 || x + direction.xDir >= maxX) {
        return true;
    }
    if (y + direction.yDir < 0 || y + direction.yDir >= maxY) {
        return true;
    }
    return false;
}

function checkNextPositionObstructed(direction, position, positionVisitedMap) {
    let x = parseInt(position.split(',')[0]);
    let y = parseInt(position.split(',')[1]);
    let nextX = x + direction.xDir;
    let nextY = y + direction.yDir;
    let nextPosition = nextX.toString() + ',' + nextY.toString();
    if (positionVisitedMap.get(nextPosition)[0]) {
        return true;
    } else {
        return false;
    }
}

function generatePositionsMap(data) {
    let positionVisitedMap = new Map();
    let guardPosition = '0,0';
    let rows = data.toString().split('\n');
    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];
        maxX = currentRow.length;
        for (let j = 0; j < currentRow.length; j++) {
            let position = j.toString() + ',' + i.toString();
            positionVisitedMap.set(position, [currentRow[j] === '#', false]);
            if (currentRow[j] === '^') {
                guardPosition = j.toString() + ',' + i.toString();
                positionVisitedMap.set(position, [false, true]);
            }
        }
        maxY = rows.length;
    }
    return [positionVisitedMap, guardPosition];
}

function getDirection() {
    let move = {
        xDir: 0,
        yDir: 0,
    }
    if (directions[0] === 'up') move.yDir = -1;
    else if (directions[0] === 'right') move.xDir = 1;
    else if (directions[0] === 'down') move.yDir = 1;
    else if (directions[0] === 'left') move.xDir = -1;
    return move;
}