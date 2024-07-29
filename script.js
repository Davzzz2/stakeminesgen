function factorial(number) {
    let value = 1;
    for (let i = number; i > 1; i--) {
        value *= i;
    }
    return value;
}

function combination(n, d) {
    if (n == d) return 1;
    return factorial(n) / (factorial(d) * factorial(n - d));
}

function calculateResults(mines, diamonds) {
    const totalCells = 25;
    const safeCells = totalCells - mines;
    const first = combination(totalCells, diamonds);
    const second = combination(safeCells, diamonds);
    const result = 0.99 * (first / second);
    const minIncreaseOnLoss = (100 / (result - 1));
    const winningChance = (99 / result);

    return {
        multiplier: result,
        minIncreaseOnLoss: minIncreaseOnLoss,
        winningChance: winningChance
    };
}

function generateMinesBoard() {
    const mines = parseInt(document.getElementById('mines').value);
    const diamonds = parseInt(document.getElementById('diamonds').value);
    const betSize = parseFloat(document.getElementById('betSize').value);

    if (!mines || !diamonds) {
        const results = `
pick a fucking set up
`;
        document.getElementById('minesResults').innerHTML = results;
        return;
    }

    const totalCells = 25;
    const cells = Array(totalCells).fill('');

    if (mines + diamonds > totalCells) {
        alert('Too many mines and diamonds!');
        return;
    }

    // Create an array of indices representing the cell positions
    let indices = Array.from({ length: totalCells }, (v, i) => i);

    // Shuffle the indices array to randomize positions
    indices = indices.sort(() => Math.random() - 0.5);

    // Place mines in the first 'mines' number of indices
    for (let i = 0; i < mines; i++) {
        cells[indices[i]] = 'mine';
    }

    // Place diamonds in the next 'diamonds' number of indices
    for (let i = mines; i < mines + diamonds; i++) {
        cells[indices[i]] = 'diamond';
    }

    // Fill remaining blank cells with default diamonds
    for (let i = 0; i < totalCells; i++) {
        if (cells[i] === '') {
            cells[i] = 'defaultDiamond';
        }
    }

    const board = document.getElementById('minesBoard');
    board.innerHTML = '';
    board.style.display = 'grid'; // Show the board
    cells.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell ' + cell;
        board.appendChild(cellDiv);
    });

    const { multiplier, minIncreaseOnLoss, winningChance } = calculateResults(mines, diamonds);
    const winAmount = betSize * multiplier;
    const results = `
<strong>Multiplier is:</strong> ${multiplier.toFixed(1)}x<br>
<strong>Win Amount is:</strong> $${winAmount.toFixed(2)}<br>
<strong>Winning Chance:</strong> ${winningChance.toFixed(3)}%<br>
<strong>Minimal increase on loss:</strong> x${minIncreaseOnLoss.toFixed(3)}
`;
    document.getElementById('minesResults').innerHTML = results;
}

function doubleBet() {
    const betInput = document.getElementById('betSize');
    let currentBet = parseFloat(betInput.value);
    currentBet = currentBet * 2;
    betInput.value = currentBet < 1 ? currentBet.toFixed(4) : currentBet.toFixed(2);
}

function halveBet() {
    const betInput = document.getElementById('betSize');
    let currentBet = parseFloat(betInput.value);
    currentBet = currentBet / 2;
    betInput.value = currentBet < 1 ? currentBet.toFixed(4) : currentBet.toFixed(2);
}
