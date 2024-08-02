document.addEventListener("DOMContentLoaded", function() {
    // Generate Mines Board
    window.generateMinesBoard = function() {
        const minesBoard = document.getElementById('minesBoard');
        const mines = parseInt(document.getElementById('mines').value);
        const diamonds = parseInt(document.getElementById('diamonds').value);
        const results = document.getElementById('minesResults');
        minesBoard.innerHTML = '';
        results.innerHTML = '';

        if (isNaN(mines) || isNaN(diamonds)) {
            results.textContent = "CHOOSE AMOUNT OF MINES AND DIAMONDS IDIOT";
            return;
        }

        const board = Array(25).fill('defaultDiamond');
        for (let i = 0; i < mines; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 25);
            } while (board[randomIndex] === 'mine');
            board[randomIndex] = 'mine';
        }

        for (let i = 0; i < diamonds; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 25);
            } while (board[randomIndex] === 'mine' || board[randomIndex] === 'diamond');
            board[randomIndex] = 'diamond';
        }

        board.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell', cell);
            minesBoard.appendChild(cellElement);
        });
    };

    // Randomize Mines and Diamonds
    window.randomizeMinesAndDiamonds = function() {
        const minMines = parseInt(document.getElementById('minMines').value);
        const maxMines = parseInt(document.getElementById('maxMines').value);
        const minDiamonds = parseInt(document.getElementById('minDiamonds').value);
        const maxDiamonds = parseInt(document.getElementById('maxDiamonds').value);

        const randomMines = Math.floor(Math.random() * (maxMines - minMines + 1)) + minMines;
        const randomDiamonds = Math.floor(Math.random() * (maxDiamonds - minDiamonds + 1)) + minDiamonds;

        document.getElementById('mines').value = randomMines;
        document.getElementById('diamonds').value = randomDiamonds;
    };

    // Generate Alphabet Board with Multipliers
    window.generateAlphabetBoard = function() {
        const minesBoard = document.getElementById('minesBoard');
        const results = document.getElementById('minesResults');
        minesBoard.innerHTML = '';
        results.innerHTML = '';

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const board = [];

        for (let i = 0; i < 25; i++) {
            const randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            const randomMultiplier = (Math.random() * (5 - 1) + 1).toFixed(2); // Random multiplier between 1 and 5
            board.push({ letter: randomLetter, multiplier: randomMultiplier });
        }

        board.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = `${cell.letter} (${cell.multiplier}x)`;
            minesBoard.appendChild(cellElement);
        });
    };

    // Double Bet Size
    window.doubleBet = function() {
        const betSizeInput = document.getElementById('betSize');
        betSizeInput.value = (parseFloat(betSizeInput.value) * 2).toFixed(4);
    };

    // Halve Bet Size
    window.halveBet = function() {
        const betSizeInput = document.getElementById('betSize');
        betSizeInput.value = (parseFloat(betSizeInput.value) / 2).toFixed(4);
    };
});
