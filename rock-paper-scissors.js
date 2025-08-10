const choices = ["rock", "paper", "scissors"];
let userScore = 0;
let computerScore = 0;
let ties = 0;
let gameOver = false;


const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const tiesEl = document.getElementById("ties");
const resultMessage = document.getElementById("result-message");
const resetBtn = document.getElementById("reset-btn");

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    if (gameOver) return; // ✅ stop clicks after win

    const userChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    const outcome = getOutcome(userChoice, computerChoice);
    updateScore(outcome);
    displayResult(userChoice, computerChoice, outcome);
    checkWinner();
  });
});


resetBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  ties = 0;
  gameOver = false; // ✅ reset the game
  updateDisplay();
  resultMessage.textContent = "";
});


function getOutcome(user, cpu) {
  if (user === cpu) return "tie";
  if (
    (user === "rock" && cpu === "scissors") ||
    (user === "paper" && cpu === "rock") ||
    (user === "scissors" && cpu === "paper")
  ) return "win";
  return "lose";
}

function updateScore(outcome) {
  if (outcome === "win") userScore++;
  else if (outcome === "lose") computerScore++;
  else ties++;
}

function updateDisplay() {
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
  tiesEl.textContent = ties;
}

function displayResult(user, cpu, outcome) {
  let msg = `You chose ${user}. Computer chose ${cpu}. `;
  if (outcome === "win") msg += "✅ You win!";
  else if (outcome === "lose") msg += "❌ You lose!";
  else msg += "⚖️ It's a tie!";
  resultMessage.textContent = msg;
  updateDisplay();
}

function checkWinner() {
  if (userScore === 5) {
    resultMessage.textContent = "🏆 You reached 5 points and WON the game!";
    gameOver = true;
  } else if (computerScore === 5) {
    resultMessage.textContent = "🤖 Computer reached 5 points. You lost the game!";
    gameOver = true;
  }
}

