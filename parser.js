var COMMAND_FORMATS = {
    REGULAR: /^(MOVE|LEFT|RIGHT|REPORT)$/,
    PLACE: /^(?:PLACE)\s(\d+),(\d+),(NORTH|SOUTH|EAST|WEST)+$/
};

var allCommands = [];

var tableSize = { x: 5, y: 5 };

function getCommands(input, tableSize) {
    var commands = input === '' ? [] : input.split(/\n/),
        startIndex = getFirstPlaceIndex(commands, tableSize),
        validCommands = [];

    if (startIndex < 0) {
        return [];
    }

    commands = commands.slice(startIndex);
    allCommands = commands;

    for (var i = 0; i < commands.length; i++) {
        if (includeInValidCommands(allCommands[i])) {
            validCommands.push(allCommands[i]);
        }
    };

    return validCommands;
}

function includeInValidCommands(command) {
    return (
        COMMAND_FORMATS.REGULAR.exec(command) !== null || isValidPlaceCommand(command, tableSize)
    );
}

function getFirstPlaceIndex(commands, tableSize) {
    var index = -1;
    for (var i = 0; i < commands.length; i++) {
        if (isValidPlaceCommand(commands[i], tableSize)) {
            index = i;
            break;
        }
    };
    return index;
}

function isValidPlaceCommand(command, tableSize) {
    var isPlaceFormat = COMMAND_FORMATS.PLACE.exec(command) !== null,
        isInRange = ifInRange(command, tableSize);

    return isPlaceFormat && isInRange;
}

function getPlaceData(placeCommand) {
    var matches = COMMAND_FORMATS.PLACE.exec(placeCommand);

    return matches === null ? null : {
        x: parseInt(matches[1], 10),
        y: parseInt(matches[2], 10),
        f: matches[3]
    };
}

function ifInRange(placeCommand, tableSize) {
    var data = getPlaceData(placeCommand);

    if (data === null) {
        return false;
    }

    return (data.x <= tableSize.x) && (data.y <= tableSize.y);
}