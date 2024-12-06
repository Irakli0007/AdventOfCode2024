let fs = require('fs');

let maxX = 0;
let maxY = 0;

fs.readFile('input.txt', (_err, data) => {
    let pathSet = initialRun(data);
    let totalInfiniteLoops = 0
    for (let pathPosition of pathSet) {
        let x = pathPosition.split(',')[0];
        let y = pathPosition.split(',')[1];
        totalInfiniteLoops += run(x, y, data);
    }
    console.log(totalInfiniteLoops);
});

function initialRun(data) {
    let directions = ['up', 'right', 'down', 'left'];
    let [positionVisitedMap, currentPosition] = generatePositionsMap(data);
    let pathSet = new Set();
    while (true) {
        let direction = getDirection(directions);
        if (hasEscaped(currentPosition, direction)) {
            break;
        }
        while (checkNextPositionObstructed(direction, currentPosition, positionVisitedMap)) {
            let currentDirection = directions.splice(0, 1)[0].toString();
            directions.push(currentDirection);
            direction = getDirection(directions);
        }
        let x = parseInt(currentPosition.split(',')[0]);
        let y = parseInt(currentPosition.split(',')[1]);
        x += direction.xDir;
        y += direction.yDir;
        currentPosition = x.toString() + ',' + y.toString();
        positionVisitedMap.set(currentPosition, [false, true]);
        if (!pathSet.has(currentPosition)) {
            pathSet.add(currentPosition);
        }
    }
    return pathSet;
}

function run(x, y, data) {
    let directions = ['up', 'right', 'down', 'left'];
    let [positionVisitedMap, currentPosition] = generatePositionsMap(data);
    positionVisitedMap.set(x.toString() + ',' + y.toString(), [true, false]);
    let loopSet = new Set();
    let total = 0;
    while (true) {
        let direction = getDirection(directions);
        if (hasEscaped(currentPosition, direction)) {
            break;
        }
        while (checkNextPositionObstructed(direction, currentPosition, positionVisitedMap)) {
            let currentDirection = directions.splice(0, 1)[0].toString();
            directions.push(currentDirection);
            direction = getDirection(directions);
        }
        let loopSetObj = {
            position: currentPosition,
            direction: direction,
        }
        if (loopSet.has(JSON.stringify(loopSetObj))) {
            total++;
            break;
        }
        loopSet.add(JSON.stringify(loopSetObj));
        let newx = parseInt(currentPosition.split(',')[0]);
        let newy = parseInt(currentPosition.split(',')[1]);
        newx += direction.xDir;
        newy += direction.yDir;
        currentPosition = newx.toString() + ',' + newy.toString();
        positionVisitedMap.set(currentPosition, [false, true]);
    }
    return total;
}

function hasEscaped(currentPosition, direction) {
    let x = parseInt(currentPosition.split(',')[0]);
    let y = parseInt(currentPosition.split(',')[1]);
    if (x + direction.xDir < 0 || x + direction.xDir === maxX) {
        return true;
    }
    if (y + direction.yDir < 0 || y + direction.yDir === maxY) {
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
    let rows = data.toString().split('\n');
    let guardPosition = '0,0';
    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];
        maxX = currentRow.length;
        for (let j = 0; j < currentRow.length; j++) {
            let position = j.toString() + ',' + i.toString();
            positionVisitedMap.set(position, [currentRow[j] === '#', false]);
            if (currentRow[j] === '^') {
                positionVisitedMap.set(position, [false, true]);
                guardPosition = j.toString() + ',' + i.toString();
            }
        }
        maxY = rows.length;
    }
    return [positionVisitedMap, guardPosition];
}

function getDirection(directions) {
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