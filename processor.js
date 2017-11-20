var directions = [
    'NORTH',
    'EAST',
    'SOUTH',
    'WEST'
];

var size = { x: 5, y: 5 };

var position = null, output = [];

function processMyCommand(input) {
    var commands = getCommands(input, size),
        action = '';

    resetToOrigin();

    for (var i = 0; i < commands.length; i++) {
        action = commands[i].includes(' ') ? commands[i].split(' ')[0].toLowerCase() : commands[i].toLowerCase();
        switch (action) {
            case 'reset':
                resetToOrigin();
                break;
            case 'place':
                placeBot(commands[i]);
                break;
            case 'move':
                moveBotTo();
                break;
            case 'left':
                moveBotToTheLeft();
                break;
            case 'right':
                moveBotToTheRight();
                break;
            case 'report':
                reportLoc();
                break;
        }
    }
}


function resetToOrigin() {
    position = null;
    output = [];
}

function placeBot(command) {
    position = getPlaceData(command);
}

function moveBotTo() {
    switch (position.f) {
        case 'NORTH':
            if (position.y < size.y) {
                position.y++;
            }
            break;
        case 'SOUTH':
            if (position.y > 0) {
                position.y--;
            }
            break;
        case 'EAST':
            if (position.x < size.x) {
                position.x++;
            }
            break;
        case 'WEST':
            if (position.x > 0) {
                position.x--;
            }
            break;
    }
}

function moveBotToTheLeft() {
    var index = getIndexForDirections(position.f) - 1;

    if (index < 0) {
        index = directions.length - 1;
    }
    position.f = directions[index];
}

function moveBotToTheRight() {
    var index = getIndexForDirections(position.f) + 1;

    if (index >= directions.length) {
        index = 0;
    }
    position.f = directions[index];
}


function reportLoc() {
    var report;
    if (position === null) {
        report = ''
    }
    else {
        report = [
            position.x.toString(),
            position.y.toString(),
            position.f
        ].join(',');
    }

    output.push(report);

    return report;
}

function getIndexForDirections(f) {
    var index,
        i = directions.length;

    while (i--) {
        if (directions[i] === f) {
            index = i;
        }
    }
    return index;
}

function outReport() {
    return output.join('\n');
}