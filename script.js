let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let mode = 'friend'; 

const cells = document.getElementById('board').children;
const resultDisplay = document.getElementById('result');
const modeSelector = document.getElementById('mode');

function startGame() {
    mode = modeSelector.value;
    resetBoard();
    updateResult();
    gameActive = true;
}

function resetBoard() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    resultDisplay.textContent = '';
    for (const cell of cells) {
        cell.textContent = '';
    }
}

function makeMove(event) {
  const index = Array.from(cells).indexOf(event.target);
  if (gameActive && board[index] === '') {
      board[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
      if (checkWinner()) {
          resultDisplay.textContent = `${currentPlayer} wins!`;
          gameActive = false;
      } else if (board.every(cell => cell !== '')) {
          resultDisplay.textContent = 'It\'s a draw!';
          gameActive = false;
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          if (mode === 'ai' && currentPlayer === 'O') {
              makeAIMove();
          }
          updateResult(); // Move this line here
      }
  }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function updateResult() {
    if (gameActive) {
        resultDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
}

function makeAIMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setTimeout(() => {
            makeMove({ target: cells[aiMove] });
        }, 500);
    }
}
