const botScore = document.querySelector("#bot-score");
const humanScore = document.querySelector("#human-score");
const roundNumber = document.querySelector("#round");
const winner = document.querySelector("#winner");
const winnerTag = document.querySelector("#winner-tag");
const botChoice = document.querySelector("#bot-choice");
const choiceBox = document.querySelector("#human-choices");
const choiceBtns = document.querySelectorAll(".choice"); // returns array

let win = 0;
let lose = 0;
let isRunning = false;
let roundCount = 1;

//choiceBox.innerHTML = `<div class="choice" id="start">Start</div>`;

function getComputerChoice() {
    // create array of choices
    let compChoices = ["Rock", "Paper", "Scissors"];
    // create random number between 0 and 2 and return array index value
    return compChoices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection) {
    computerSelection = getComputerChoice();
    botChoice.textContent = computerSelection == "Rock" ? "🪨" : "Paper" ? "📃" : "✂️";
    roundNumber.textContent = `round ${roundCount}`;
    roundCount++;

    // print result to console log
    if (playerSelection == computerSelection) {
        winner.textContent = `Tie...`;
        winnerTag.textContent = `Bot also selected ${computerSelection}`;
        return;
    }
    else if (
        (playerSelection == "Rock" && computerSelection == "Scissors") ||
        (playerSelection == "Scissors" && computerSelection == "Paper") ||
        (playerSelection == "Paper" && computerSelection == "Rock")
        ) {
        winner.textContent = `Human...`;
        winnerTag.textContent = `${playerSelection} beats ${computerSelection}`;
        win++;
    }
    else {
        winner.textContent = `Bot...`;
        winnerTag.textContent = `${computerSelection} beats ${playerSelection}`;
        lose++;
    }

    if (win === 5) {
        isRunning = false;
        roundNumber.textContent = `Game over`;
        winner.textContent = `You win!!!`;
        winnerTag.textContent = `Please play again...`;
    }
    if (lose === 5) {
        isRunning = false;
        roundNumber.textContent = `Game over!`;
        winner.textContent = `The bot wins...:(`;
        winnerTag.textContent = `Better luck next time!`;
    }
}

// detect which button was pressed and return 'Rock', 'Paper' or 'Scissors'
choiceBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // reset for next game
        if (isRunning === false) {
            win = 0;
            lose = 0;
            roundCount = 1;
            // choiceBox.innerHTML = `
            // <div class="choice" data-choice="Rock">R</div>
            // <div class="choice" data-choice="Paper">P</div>
            // <div class="choice" data-choice="Scissors">S</div>
            // `;
            isRunning = true;
        }
        playerSelection = e.target.getAttribute("data-choice");
        console.log(playerSelection);
        playRound(playerSelection);
        botScore.textContent = lose;
        humanScore.textContent = win;
    });
});

let computerSelection = getComputerChoice();
let playerSelection;

console.log(choiceBtns);