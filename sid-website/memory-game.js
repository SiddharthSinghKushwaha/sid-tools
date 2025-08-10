const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const board = document.getElementById("game-board");
const winMessage = document.getElementById("win-message");
const timerDisplay = document.createElement("p");

timerDisplay.id = "timer";
document.querySelector(".main-content").insertBefore(timerDisplay, board);

let emojis = ['🍕', '🚀', '🎧', '🐶', '🍩', '📚', '🌈', '⚽', '🎮', '🐱'];
let cardValues = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft = 75;
let gameActive = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  board.innerHTML = '';
  matchedPairs = 0;
  flippedCards = [];
  winMessage.textContent = '';
  timeLeft = 75;
  updateTimer();
  gameActive = true;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      winMessage.textContent = "⏳ Time's up! Here's what you missed:";
      revealAllCards();
      gameActive = false;
    }
  }, 1000);

  shuffle(cardValues);
  cardValues.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    card.addEventListener('click', handleFlip);
    board.appendChild(card);
  });
}


function handleFlip(e) {
  if (!gameActive) return;

  const card = e.currentTarget;
  if (
    card.classList.contains('flipped') ||
    flippedCards.length === 2 ||
    card.classList.contains('matched')
  ) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      flippedCards = [];
      matchedPairs++;
      if (matchedPairs === emojis.length) {
        clearInterval(timer);
        winMessage.textContent = '🎉 You matched all cards!';
        gameActive = false;
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 800);
    }
  }
}

function revealAllCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('flipped');
  });
}

function disableAllCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.removeEventListener('click', handleFlip);
  });
}

function updateTimer() {
  timerDisplay.textContent = `🕒 Time left: ${timeLeft}s`;
}

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  winMessage.textContent = '';
  timeLeft = 75;
  updateTimer();
  board.innerHTML = '';
  gameActive = false;
});

startBtn.addEventListener('click', () => {
  createBoard();
});

