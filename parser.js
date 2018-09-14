var COMMAND_FORMATS = {
  REGULAR: /^(MOVE|LEFT|RIGHT|REPORT)$/,
  PLACE: /^(?:PLACE)\s(\d+),(\d+),(NORTH|SOUTH|EAST|WEST)+$/
};

var allCommands = [];

var gridSize = { x: 5, y: 5 };

function getCommands(input, gridSize) {
  var commands = input === "" ? [] : input.split(/\n/),
    startIndex,
    validCommands = [];

  // trimming leading and trailing white spaces in each command
  commands.forEach((command, index, commands) => {
    commands[index] = command.toUpperCase().trim();
  });

  startIndex = getInitialPositionIndex(commands, gridSize);

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
    isValidPlaceCommand(command, gridSize)
  );
}

function getInitialPositionIndex(commands, gridSize) {
  var index = -1;
  for (var i = 0; i < commands.length; i++) {
    if (isValidPlaceCommand(commands[i], gridSize)) {
      index = i;
      break;
    }
  }
  return index;
}

function isValidPlaceCommand(command, gridSize) {
  var isDirectionValid = COMMAND_FORMATS.PLACE.exec(command) !== null,
    isCommandInRange = ifInRange(command, gridSize);

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

function ifInRange(placeCommand, gridSize) {
  var data = getBotLocationData(placeCommand);

  if (data === null) {
    return false;
  }

  return data.x <= gridSize.x && data.y <= gridSize.y;
}
