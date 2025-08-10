const words = [
  "javascript", "developer", "keyboard", "function", "variable", "puzzle",
  "theme", "neon", "scramble", "project", "creative", "dynamic"
];

let timer;
let timeLeft = 120;
const timerDisplay = document.createElement("p");
timerDisplay.id = "timer";
document.querySelector(".game-box").appendChild(timerDisplay);
let currentWord = "";

function pickNewWord() {
  userInput.value = "";
  feedback.textContent = "";
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambledEl.textContent = scramble(currentWord);

  clearInterval(timer);       // ✅ Stop previous timer
  timeLeft = 120;
  updateTimer();              // update visible timer
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timer);
      feedback.textContent = `⏳ Time's up! The correct word was "${currentWord}".`;
    }
  }, 1000);
}


window.addEventListener("DOMContentLoaded", pickNewWord);

const showBtn = document.getElementById("show-btn");

showBtn.addEventListener("click", () => {
  clearInterval(timer); // stop timer
  feedback.textContent = `🟢 The word was: "${currentWord}"`;
});


const scrambledEl = document.getElementById("scrambled-word");
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

function scramble(word) {
  let scrambled = word.split('');

  // Fisher-Yates shuffle (better than sort random)
  for (let i = scrambled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
  }

  return scrambled.join('');
}


clearInterval(timer);
timeLeft = 120;
updateTimer();
timer = setInterval(() => {
  timeLeft--;
  updateTimer();
  if (timeLeft === 0) {
    clearInterval(timer);
    feedback.textContent = `⏳ Time's up! The correct word was "${currentWord}".`;
  }
}, 1000);

function updateTimer() {
  timerDisplay.textContent = `⏱️ Time left: ${timeLeft}s`;
}


checkBtn.addEventListener("click", () => {
  const guess = userInput.value.trim().toLowerCase();
  if (guess === currentWord) {
    feedback.textContent = "✅ Correct!";
    clearInterval(timer); // ✅ Stop timer on correct answer
  } else {
    feedback.textContent = "❌ Try Again!";
  }
});


nextBtn.addEventListener("click", pickNewWord);

// Load first word
window.addEventListener("DOMContentLoaded", pickNewWord);
