// Declaration
var commands = document.getElementById('commandArea');
var report = document.getElementById('report');

// Process the given command(s) to report the correct position of the robot
function excecuteCommand() {
    processMyCommand(commands.value);
    report.innerHTML = outReport();
}