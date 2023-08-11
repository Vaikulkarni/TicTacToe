const cells = document.querySelectorAll('.cell');
const resultDisplay = document.querySelector('.result p');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameActive= true;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);


function handleCellClick(event) {
    const cell = event.target;

    if (!gameActive || cell.textContent !== '') {
        return;
    }

    cell.textContent = currentPlayer;

    if (checkWin()) {
        endGame(`${currentPlayer} wins!`);
    } else if (checkTie()) {
        endGame("It's a tie!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]            // diagonals
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }

    return false;
}

function checkTie() {
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(message) {
    resultDisplay.textContent = message;
    resultDisplay.classList.add('blast');
    startConfetti();
    gameActive = false;
    setTimeout(() => {
        resultDisplay.classList.remove('blast'); // Remove the blast class after the animation
        confetti.stop();
    }, 5000);
}

const confettiSettings = {
    target: 'confetti-container',
    respawn: true,
    rotate: true,
    clock: 30,
    clockwise: false,
    start_from_edge: false,
    colors: ['#f00', '#0f0', '#00f'], // Add your preferred colors
};

const confetti = new ConfettiGenerator(confettiSettings);

function startConfetti() {
    confetti.render();
}

function stopConfetti() {
    confetti.clear();
}





function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resultDisplay.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}
