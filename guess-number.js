let secretNumber = Math.floor(Math.random() * 501); // Random number from 0 to 500
let attempts = 0;

const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resetBtn = document.getElementById("reset-btn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");

// Reusable function to show blinking feedback
function showFeedback(message) {
  feedback.classList.remove("animate");      // remove animation class
  void feedback.offsetWidth;                 // force browser reflow
  feedback.textContent = message;            // set new message
  feedback.classList.add("animate");         // re-add animation class
}

// Handle guess button click
guessBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess)) {
    showFeedback("❗ Please enter a valid number.");
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (guess === secretNumber) {
    showFeedback(`🎉 Correct! The number was ${secretNumber}`);
    guessBtn.disabled = true;
  } else if (guess < secretNumber) {
    showFeedback("🔽 Too low!");
  } else {
    showFeedback("🔼 Too high!");
  }
});

// Handle reset button click
resetBtn.addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 501);
  attempts = 0;
  guessInput.value = "";
  guessBtn.disabled = false;
  attemptsDisplay.textContent = "Attempts: 0";
  showFeedback(""); // Clear feedback on reset
});
