const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const modeInputs = document.querySelectorAll('input[name="mode"]');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameOver = false;
let vsComputer = false;

modeInputs.forEach(input => {
  input.addEventListener('change', () => {
    vsComputer = document.querySelector('input[name="mode"]:checked').value === 'computer';
    resetGame();
  });
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;

    if (board[index] || isGameOver) return;

    makeMove(index, currentPlayer);
    
    if (!isGameOver && vsComputer && currentPlayer === 'O') {
      setTimeout(() => {
        makeComputerMove();
      }, 400);
    }
  });
});

resetBtn.addEventListener('click', resetGame);

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  if (checkWin(player)) {
    statusEl.textContent = `🎉 ${player} wins!`;
    isGameOver = true;
    return;
  }

  if (!board.includes('')) {
    statusEl.textContent = `🤝 It's a draw!`;
    isGameOver = true;
    return;
  }

  currentPlayer = player === 'X' ? 'O' : 'X';
  statusEl.textContent = `Current Turn: ${currentPlayer}`;
}

function makeComputerMove() {
  let available = board.map((val, i) => val === '' ? i : null).filter(v => v !== null);
  const randomIndex = available[Math.floor(Math.random() * available.length)];
  makeMove(randomIndex, 'O');
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameOver = false;
  statusEl.textContent = `Current Turn: X`;
  cells.forEach(cell => cell.textContent = '');
}
