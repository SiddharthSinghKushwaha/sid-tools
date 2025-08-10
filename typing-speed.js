const paragraph = `A friend is often seen as less important than a husband or a wife and definitely ranks lower than blood relations. So despite legions of studies proving they are essential to long-term mental and physical health, friendships are often the first relationships to fall by the wayside when life gets crazy.`;

const paragraphEl = document.getElementById("target-paragraph");
const typingArea = document.getElementById("typing-area");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let startTime;
let interval;
let finished = false;

// Display paragraph as span-per-char for highlighting
paragraphEl.innerHTML = paragraph
  .split("")
  .map(char => `<span>${char}</span>`)
  .join("");

// Timer
function startTimer() {
  startTime = new Date();
  interval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    timerEl.textContent = elapsed;
  }, 1000);
}

// Typing Logic
typingArea.addEventListener("input", () => {
  const input = typingArea.value;
  const spans = paragraphEl.querySelectorAll("span");

  if (!startTime) startTimer();

  let correctChars = 0;
  let incorrectChars = 0;

  // Highlight matching characters
  spans.forEach((span, index) => {
    const typedChar = input[index];

    if (typedChar == null) {
      span.classList.remove("correct", "incorrect");
    } else if (typedChar === span.textContent) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctChars++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      incorrectChars++;
    }
  });

  // If typing completed
  if (input.length === paragraph.length && !finished) {
    clearInterval(interval);
    finished = true;

    const timeTaken = (new Date() - startTime) / 1000 / 60; // in minutes
    const wpm = Math.round(paragraph.split(" ").length / timeTaken);
    const accuracy = Math.round((correctChars / paragraph.length) * 100);

    wpmEl.textContent = wpm;
    accuracyEl.textContent = `${accuracy}%`;

    typingArea.disabled = true;
  }
});

const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", () => {
  clearInterval(interval);
  typingArea.disabled = false;
  typingArea.value = "";
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0%";
  finished = false;
  startTime = null;

  // Reset spans
  const spans = paragraphEl.querySelectorAll("span");
  spans.forEach(span => {
    span.classList.remove("correct", "incorrect");
  });
});

function updateTextMatch() {
  const target = targetParagraph.textContent;
  const typed = typingArea.value;

  let display = "";
  for (let i = 0; i < target.length; i++) {
    if (i < typed.length) {
      if (typed[i] === target[i]) {
        display += `<span class="correct">${target[i]}</span>`;
      } else {
        display += `<span class="incorrect">${target[i]}</span>`;
      }
    } else {
      display += `<span>${target[i]}</span>`;
    }
  }

  targetParagraph.innerHTML = display;
}
