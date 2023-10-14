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
  return [playerPoint, computerPoint, message];
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

let playerCount = 0;
let computerCount = 0;
let message;
let gameOver = false;

addEventListener("DOMContentLoaded", (event) => {
  const buttons = document.querySelectorAll("button.rps-option-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (gameOver) return;
      console.log(2);
      const playerSelection = this.id;
      const computerSelection = getComputerChoice();
      const results = playRound(playerSelection, computerSelection);
      playerCount += results[0];
      computerCount += results[1];
      const thisRoundMessage = results[2];
      const divForMessage = document.querySelector("#round-messages");
      if (playerCount === 5 || computerCount === 5) {
        gameOver = true;
        if (playerCount > computerCount) {
          message = `You beat the computer ${playerCount} to ${computerCount}.`;
        } else if (computerCount > playerCount) {
          message = `The computer beat you ${computerCount} to ${playerCount}.`;
        } else {
          message = `You tied with the computer at ${playerCount} points.`;
        }
        const endgameMessageElem = document.createElement("h4");
        endgameMessageElem.textContent = message;
        divForMessage.appendChild(endgameMessageElem);
      } else {
        const roundMessageElem = document.createElement("div");
        roundMessageElem.textContent = thisRoundMessage;
        divForMessage.appendChild(roundMessageElem);
      }
    });
  });
});
