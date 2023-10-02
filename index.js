function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getComputerChoice() {
  const options = ["Rock", "Paper", "Scissors"];
  return options[getRndInteger(0, options.length)];
}

function convertToTitleCase(str) {
  if (!str) {
    return "";
  }
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();
  let playerPoint = 0;
  let computerPoint = 0;
  let message;
  if (doesLeftBeatRight(playerSelection, computerSelection)) {
    message = `You Win! ${convertToTitleCase(
      playerSelection
    )} beats ${convertToTitleCase(computerSelection)}`;
    playerPoint++;
  } else if (doesLeftBeatRight(computerSelection, playerSelection)) {
    message = `You Lose! ${convertToTitleCase(
      computerSelection
    )} beats ${convertToTitleCase(playerSelection)}`;
    computerPoint++;
  } else {
    message = `You Tied! You both played ${convertToTitleCase(
      playerSelection
    )}`;
  }
  console.log(message);
  return [playerPoint, computerPoint];
}

function doesLeftBeatRight(left, right) {
  if (left === right) return false;
  if (left === "rock") {
    return right === "scissors" ? true : false;
  }
  if (left === "paper") {
    return right === "rock" ? true : false;
  }
  if (left === "scissors") {
    return right === "paper" ? true : false;
  }
}

function game() {
  let playerCount = 0;
  let computerCount = 0;
  let message;
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt("Choose your play");
    const computerSelection = getComputerChoice();
    const results = playRound(playerSelection, computerSelection);
    playerCount += results[0];
    computerCount += results[1];
  }
  if (playerCount > computerCount) {
    message = `You beat the computer ${playerCount} to ${computerCount}.`;
  } else if (computerCount > playerCount) {
    message = `The computer beat you ${computerCount} to ${playerCount}.`;
  } else {
    message = `You tied with the computer at ${playerCount} points.`;
  }
  console.log(message);
}

game();