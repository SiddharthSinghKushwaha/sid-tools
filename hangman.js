const wordList = [
  { word: "planet", hint: "A large celestial body orbiting a star." },
  { word: "guitar", hint: "A musical instrument with strings." },
  { word: "rocket", hint: "It blasts off into space." },
  { word: "python", hint: "A programming language and a snake." },
  { word: "object", hint: "A basic unit in object-oriented programming." },
  { word: "window", hint: "You open it to get fresh air or in an OS." },
  { word: "memory", hint: "Your computer needs it to multitask." },
  { word: "laptop", hint: "A portable personal computer." },
  { word: "future", hint: "What hasn't happened yet." },
  { word: "school", hint: "Where students go to learn." }
];

const maxWrong = 6;

let selectedWord = "";
let guessedLetters = [];
let wrongLetters = [];

const wordDisplay = document.getElementById("word-display");
const hangmanFigure = document.getElementById("hangman-figure");
const letterButtons = document.getElementById("letter-buttons");
const wrongDisplay = document.getElementById("wrong-letters");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");

const hangmanStages = ["🙂", "😐", "😬", "☹️", "😣", "😵", "💀"];

function chooseWord() {
  const random = wordList[Math.floor(Math.random() * wordList.length)];
  selectedWord = random.word.toLowerCase();
  guessedLetters = [];
  wrongLetters = [];
  document.getElementById("hint").textContent = "Hint: " + random.hint;
  document.getElementById("message").textContent = "";
  updateDisplay();
  generateButtons();
}


function generateButtons() {
  letterButtons.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.classList.add("letter");
    btn.addEventListener("click", () => handleGuess(char));
    btn.disabled = false;
    letterButtons.appendChild(btn);
  }
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;

  const btn = [...letterButtons.children].find(b => b.textContent === letter);
  if (selectedWord.includes(letter.toLowerCase())) {
    guessedLetters.push(letter);
    btn.disabled = true;
    updateDisplay();
    checkWin();
  } else {
    wrongLetters.push(letter);
    btn.disabled = true;
    updateDisplay();
    checkLose();
  }
}

function updateDisplay() {
  let display = "";
  for (let letter of selectedWord) {
    display += guessedLetters.includes(letter.toUpperCase()) || guessedLetters.includes(letter.toLowerCase())
      ? letter.toUpperCase() + " "
      : "_ ";
  }
  wordDisplay.textContent = display.trim();
  hangmanFigure.textContent = hangmanStages[wrongLetters.length];
  wrongDisplay.textContent = "Wrong: " + wrongLetters.join(" ");
}

function checkWin() {
  const won = selectedWord.split("").every(letter =>
    guessedLetters.includes(letter.toLowerCase()) || guessedLetters.includes(letter.toUpperCase())
  );
  if (won) {
    message.textContent = "🎉 You won!";
    disableAllButtons();
  }
}

function checkLose() {
  if (wrongLetters.length >= maxWrong) {
    message.textContent = `💀 You lost! Word was: ${selectedWord.toUpperCase()}`;
    disableAllButtons();
  }
}

function disableAllButtons() {
  document.querySelectorAll(".letter").forEach(btn => btn.disabled = true);
}

resetBtn.addEventListener("click", chooseWord);

// Start the game
chooseWord();
