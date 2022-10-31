const roundNumber = document.querySelector("#round");
const winner = document.querySelector("#winner");
const winnerTag = document.querySelector("#winner-tag");
const botChoice = document.querySelector("#bot-choice");
const choiceBox = document.querySelector("#human-choices");
const choiceBtns = document.querySelectorAll(".choice"); // returns array
const botTotal = document.querySelector("#bot-total");
const humanTotal = document.querySelector("#human-total");
const instructions = document.querySelector("#instructions");

let win = 0;
let lose = 0;
let isRunning = false;
let roundCount = 1;
let botTotalCount = 0;
let humanTotalCount = 0;

//choiceBox.innerHTML = `<div class="choice" id="start">Start</div>`;

function getComputerChoice() {
    // create array of choices
    let compChoices = ["Rock", "Paper", "Scissors"];
    // create random number between 0 and 2 and return array index value
    return compChoices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection) {
    computerSelection = getComputerChoice();

    if (computerSelection == "Rock") {
        botChoice.innerHTML = `<img src="./images/rock.svg" class="hand" alt="rock">`;
    }
    else if (computerSelection == "Paper") {
        botChoice.innerHTML = `<img src="./images/paper.svg" class="hand" alt="paper">`;
    }
    else if (computerSelection == "Scissors") {
        botChoice.innerHTML = `<img src="./images/scissors.svg" class="hand" alt="scissors">`;
    }
    
    botChoice.classList.add('big');
    setTimeout(() => {
        botChoice.classList.remove('big');
    }, 300);

    roundNumber.textContent = `Round ${roundCount}`;
    roundCount++;

    // print result to console log
    if (playerSelection == computerSelection) {
        winner.textContent = `Tie`;
        winnerTag.textContent = `You both selected ${computerSelection}`;
        return;
    }
    else if (
        (playerSelection == "Rock" && computerSelection == "Scissors") ||
        (playerSelection == "Scissors" && computerSelection == "Paper") ||
        (playerSelection == "Paper" && computerSelection == "Rock")
        ) {
        winner.textContent = `You win round`;
        winnerTag.textContent = `${playerSelection} beats ${computerSelection}`;
        win++;
        //human score lights
        const scoreLight = document.querySelector(`.score-light[data-light-human='${win}']`);
        scoreLight.classList.toggle("light-off");
        scoreLight.classList.toggle("light-on");
    }
    else {
        winner.textContent = `Bot wins round`;
        winnerTag.textContent = `${computerSelection} beats ${playerSelection}`;
        lose++;
        //bot score lights
        const scoreLight = document.querySelector(`.score-light[data-light-bot='${lose}']`);
        scoreLight.classList.toggle("light-off");
        scoreLight.classList.toggle("light-on");
    }

    if (win === 5) {
        isRunning = false;
        roundNumber.textContent = `Game over`;
        winner.textContent = `You win!`;
        winnerTag.textContent = `Can you win again?`;
        instructions.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Play again <i class="fa-solid fa-arrow-down"></i>`;
        setTimeout(() => {
            instructions.classList.add('yellow');
        }, 1000);
        humanTotalCount++;
        humanTotal.textContent = `Total games won: ${humanTotalCount}`;
    }
    if (lose === 5) {
        isRunning = false;
        roundNumber.textContent = `Game over!`;
        winner.textContent = `The bot wins...:(`;
        winnerTag.textContent = `Better luck next time!`;
        instructions.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Play again <i class="fa-solid fa-arrow-down"></i>`;
        setTimeout(() => {
            instructions.classList.add('yellow');
        }, 500);
        botTotalCount++;
        botTotal.textContent = `Total games won: ${botTotalCount}`;
    }
}

// make instructions bounce
setInterval(() => {
    instructions.classList.toggle('bounce');
}, 1500);
instructions.classList.add('yellow');


// detect which button was pressed and return 'Rock', 'Paper' or 'Scissors'
choiceBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // reset for next game
        if (isRunning === false) {
            win = 0;
            lose = 0;
            roundCount = 1;
            resetScoreLights();
            instructions.innerHTML = ``;
            instructions.classList.remove('bounce', 'yellow');
            isRunning = true;
        }
        playerSelection = e.target.getAttribute("data-choice");
        console.log(`*** Round: ${roundCount} ***`)
        console.log(`Player: ${playerSelection}`);
        playRound(playerSelection);
        console.log(`Comp:   ${computerSelection}`);
    });
});

function resetScoreLights() {
    for (let i = 1; i <=5; i++) {
        const scoreLightBot = document.querySelector(`.score-light[data-light-bot='${i}']`);
        const scoreLightHuman = document.querySelector(`.score-light[data-light-human='${i}']`);
        scoreLightBot.classList.remove("light-on");
        scoreLightBot.classList.add("light-off");
        scoreLightHuman.classList.remove("light-on");
        scoreLightHuman.classList.add("light-off");
    }
}

let computerSelection = getComputerChoice();
let playerSelection;

console.log(choiceBtns);