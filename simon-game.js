const colors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

const levelTitle = document.getElementById("level-title");
const startBtn = document.getElementById("start-btn");
const message = document.getElementById("message");

colors.forEach(color => {
  document.getElementById(color).addEventListener("click", () => handleUserClick(color));
});

startBtn.addEventListener("click", () => {
  if (!started) {
    level = 0;
    gamePattern = [];
    userPattern = [];
    message.textContent = "";
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userPattern = [];
  level++;
  levelTitle.textContent = "Level " + level;

  const randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  animatePress(randomColor);
}

function handleUserClick(color) {
  if (!started) return;
  userPattern.push(color);
  animatePress(color);
  checkAnswer(userPattern.length - 1);
}

function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userPattern[currentIndex]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
        levelTitle.textContent = "Game Over";
        const sequenceInitials = gamePattern.map(c => c.charAt(0).toUpperCase()).join('');
        message.textContent = `❌ You reached level ${level}. Correct sequence was: ${sequenceInitials}. Click Start to try again!`;
        started = false;
  }
}

function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 300);
}
