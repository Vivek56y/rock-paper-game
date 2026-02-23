// Game State
let userScore = 0;
let computerScore = 0;
let roundNumber = 1;
let gameActive = true;

// DOM Elements
const msg = document.querySelector("#msg");
const userScoreElement = document.querySelector("#userscore");
const computerScoreElement = document.querySelector("#compscore");
const roundNumberElement = document.querySelector("#roundNumber");
const choices = document.querySelectorAll(".choice");
const resetBtn = document.querySelector("#resetBtn");
const msgContainer = document.querySelector(".msgcontainer");
const userChoiceDisplay = document.querySelector("#userChoiceDisplay");
const computerChoiceDisplay = document.querySelector("#computerChoiceDisplay");

// Game Constants
const WINNING_SCORE = 10;
const CHOICES = ["rock", "paper", "scissor"];
const CHOICE_EMOJIS = {
    rock: "🪨",
    paper: "📄",
    scissor: "✂️"
};

// Initialize game
function initGame() {
    updateScoreDisplay();
    addEventListeners();
}

// Add event listeners
function addEventListeners() {
    choices.forEach((choice) => {
        choice.addEventListener("click", () => {
            if (!gameActive) return;
            
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        });
    });
    
    resetBtn.addEventListener("click", resetGame);
}

// Get computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return CHOICES[randomIndex];
}

// Display choices
function displayChoices(userChoice, computerChoice) {
    userChoiceDisplay.textContent = `${CHOICE_EMOJIS[userChoice]} ${userChoice}`;
    computerChoiceDisplay.textContent = `${CHOICE_EMOJIS[computerChoice]} ${computerChoice}`;
    
    // Add animation
    userChoiceDisplay.parentElement.classList.add('fade-in');
    computerChoiceDisplay.parentElement.classList.add('fade-in');
    
    setTimeout(() => {
        userChoiceDisplay.parentElement.classList.remove('fade-in');
        computerChoiceDisplay.parentElement.classList.remove('fade-in');
    }, 500);
}

// Game draw
function gameDraw() {
    msg.textContent = "🤝 It's a Draw! Try again!";
    setMessageClass('draw-message');
}

// Show winner
function showWinner(userWin, userChoice, computerChoice) {
    if (userWin) {
        userScore++;
        msg.textContent = `🎉 You Win! ${userChoice} beats ${computerChoice}`;
        setMessageClass('win-message');
        
        // Add celebration animation
        userScoreElement.parentElement.classList.add('pulse');
        setTimeout(() => {
            userScoreElement.parentElement.classList.remove('pulse');
        }, 1000);
    } else {
        computerScore++;
        msg.textContent = `😔 You Lose! ${computerChoice} beats ${userChoice}`;
        setMessageClass('loss-message');
        
        // Add shake animation
        computerScoreElement.parentElement.classList.add('shake');
        setTimeout(() => {
            computerScoreElement.parentElement.classList.remove('shake');
        }, 500);
    }
    
    updateScoreDisplay();
    checkGameEnd();
}

// Set message styling class
function setMessageClass(className) {
    msgContainer.classList.remove('win-message', 'loss-message', 'draw-message');
    msgContainer.classList.add(className);
}

// Update score display
function updateScoreDisplay() {
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    roundNumberElement.textContent = roundNumber;
}

// Check if game should end
function checkGameEnd() {
    if (userScore >= WINNING_SCORE) {
        endGame('🏆 Congratulations! You are the Champion!');
    } else if (computerScore >= WINNING_SCORE) {
        endGame('💀 Game Over! Computer wins the battle!');
    }
}

// End game
function endGame(finalMessage) {
    gameActive = false;
    msg.textContent = finalMessage;
    
    // Disable choices
    choices.forEach(choice => {
        choice.style.opacity = '0.5';
        choice.style.cursor = 'not-allowed';
    });
    
    // Show reset button prominently
    resetBtn.classList.add('pulse');
}

// Reset game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundNumber = 1;
    gameActive = true;
    
    updateScoreDisplay();
    
    // Reset message
    msg.textContent = "Choose your weapon to begin the battle!";
    setMessageClass('');
    
    // Reset choice displays
    userChoiceDisplay.textContent = '-';
    computerChoiceDisplay.textContent = '-';
    
    // Re-enable choices
    choices.forEach(choice => {
        choice.style.opacity = '1';
        choice.style.cursor = 'pointer';
    });
    
    // Remove reset button animation
    resetBtn.classList.remove('pulse');
}

// Main game function
function playGame(userChoice) {
    console.log(`User chose: ${userChoice}`);
    
    const computerChoice = getComputerChoice();
    console.log(`Computer chose: ${computerChoice}`);
    
    // Display choices
    displayChoices(userChoice, computerChoice);
    
    // Increment round
    roundNumber++;
    updateScoreDisplay();
    
    // Determine winner
    if (userChoice === computerChoice) {
        gameDraw();
    } else {
        let userWin = determineWinner(userChoice, computerChoice);
        showWinner(userWin, userChoice, computerChoice);
    }
}

// Determine winner logic
function determineWinner(userChoice, computerChoice) {
    if (userChoice === "rock") {
        return computerChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
        return computerChoice === "scissor" ? false : true;
    } else { // scissor
        return computerChoice === "rock" ? false : true;
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
