function getComputerChoice() {
    // create array of choices
    let compChoices = ["Rock", "Paper", "Scissors"];
    // create random number between 0 and 2 and return array index value
    return compChoices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    // tidy up user input
    playerSelection = playerSelection.toLowerCase().trim();
    firstLetter = playerSelection.slice(0, 1).toUpperCase();
    playerSelection = firstLetter + playerSelection.slice(1);

    // validate user input 
    if (playerSelection != "Rock" && 
        playerSelection != "Paper" && 
        playerSelection != "Scissors") {
        console.log("Please type rock, paper or scissors");
        return;
    }

    console.log(`Round: ${roundCount}`);
    roundCount++;

    // print result to console log
    if (playerSelection == computerSelection) {
        console.log(`It's a tie! Computer also selected ${computerSelection}`)
        return "tie";
    }
    else if (
        (playerSelection == "Rock" && computerSelection == "Scissors") ||
        (playerSelection == "Scissors" && computerSelection == "Paper") ||
        (playerSelection == "Paper" && computerSelection == "Rock")
        ) {
        console.log(`You win! ${playerSelection} beats ${computerSelection}`)
        return "win";
    }
    else {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}`)
        return "lose";
    }
}

function game(rounds = 5) {
    let win = 0;
    let lose = 0;
    let tie = 0;
    for (let i = 0; i < rounds; i++) {
        let result = playRound(playerSelection,computerSelection);
        if (result == "win") {
            win++;
        } else if ( result == "lose") {
            lose++;
        } else {
            tie++;
        }
        computerSelection = getComputerChoice();
    }
    console.log(`---Results---\n Wins: ${win}\nLoses: ${lose}\n Ties: ${tie}`)

}

let computerSelection = getComputerChoice();
let playerSelection = "paper";
let roundCount = 1;

// playRound(playerSelection, computerSelection);
game(50);