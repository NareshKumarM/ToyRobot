var COMMAND_FORMATS = {
  REGULAR: /^(MOVE|LEFT|RIGHT|REPORT)$/,
  PLACE: /^(?:PLACE)\s(\d+),(\d+),(NORTH|SOUTH|EAST|WEST)+$/
};

var allCommands = [];

var tableSize = { x: 5, y: 5 };

function getCommands(input, tableSize) {
  var commands = input === "" ? [] : input.split(/\n/),
    startIndex,
    validCommands = [];

  // trimming leading and trailing white spaces in each command
  commands.forEach((command, index, commands) => {
    commands[index] = command.toUpperCase().trim();
  });

  startIndex = getInitialPositionIndex(commands, tableSize);

  if (startIndex < 0) {
    return [];
  }

  commands = commands.slice(startIndex);
  allCommands = commands;

  for (var i = 0; i < commands.length; i++) {
    if (appendToValidCommands(allCommands[i])) {
      validCommands.push(allCommands[i]);
    }
  }

  return validCommands;
}

function appendToValidCommands(command) {
  return (
    COMMAND_FORMATS.REGULAR.exec(command) !== null ||
    isValidPlaceCommand(command, tableSize)
  );
}

function getInitialPositionIndex(commands, tableSize) {
  var index = -1;
  for (var i = 0; i < commands.length; i++) {
    if (isValidPlaceCommand(commands[i], tableSize)) {
      index = i;
      break;
    }
  }
  return index;
}

function isValidPlaceCommand(command, tableSize) {
  var isDirectionValid = COMMAND_FORMATS.PLACE.exec(command) !== null,
    isCommandInRange = ifInRange(command, tableSize);

  return isDirectionValid && isCommandInRange;
}

function getBotLocationData(placeCommand) {
  var matches = COMMAND_FORMATS.PLACE.exec(placeCommand);

  return matches === null
    ? null
    : {
        x: parseInt(matches[1], 10),
        y: parseInt(matches[2], 10),
        f: matches[3]
      };
}

function ifInRange(placeCommand, tableSize) {
  var data = getBotLocationData(placeCommand);

  if (data === null) {
    return false;
  }

  return data.x <= tableSize.x && data.y <= tableSize.y;
}
