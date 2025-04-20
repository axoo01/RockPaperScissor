const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const victoryModal = document.getElementById("victoryModal");
const victoryMessage = document.getElementById("victoryMessage");
const clickSound = document.getElementById("clickSound");
let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    clickSound.play();

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else {
        switch (playerChoice) {
            case "rock":
                result = computerChoice === "scissors" ? "You win!" : "You lose!";
                break;
            case "paper":
                result = computerChoice === "rock" ? "You win!" : "You lose!";
                break;
            case "scissors":
                result = computerChoice === "paper" ? "You win!" : "You lose!";
                break;
        }
    }

    playerDisplay.textContent = `Player: ${playerChoice}`;
    computerDisplay.textContent = `Computer: ${computerChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("win", "lose", "tie");
    switch (result) {
        case "You win!":
            resultDisplay.classList.add("win");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            if (playerScore % 3 === 0) {
                confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            }
            if (playerScore >= 3) showVictory("Player Wins the Game!");
            break;
        case "You lose!":
            resultDisplay.classList.add("lose");
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            if (computerScore % 3 === 0) {
                confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            }
            if (computerScore >= 3) showVictory("Computer Wins the Game!");
            break;
        case "It's a tie!":
            resultDisplay.classList.add("tie");
            break;
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = "0";
    computerScoreDisplay.textContent = "0";
    playerDisplay.textContent = "Player: --";
    computerDisplay.textContent = "Computer: --";
    resultDisplay.textContent = "Ready? Play!";
    resultDisplay.classList.remove("win", "lose", "tie");
    victoryModal.style.display = "none";
}

function showVictory(message) {
    victoryMessage.textContent = message;
    victoryModal.style.display = "flex";
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
}

function closeModal() {
    victoryModal.style.display = "none";
    resetGame();
}