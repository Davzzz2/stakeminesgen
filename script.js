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

function generateBoard() {
    const mines = parseInt(document.getElementById('mines').value);
    const diamonds = parseInt(document.getElementById('diamonds').value);
    const betSize = parseFloat(document.getElementById('betSize').value);
    const totalCells = 25;
    const cells = Array(totalCells).fill('');

    if (mines + diamonds > totalCells) {
        alert('Too many mines and diamonds!');
        return;
    }

    // Place mines randomly on the board
    for (let i = 0; i < mines; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * totalCells);
        } while (cells[randomIndex] === 'mine');
        cells[randomIndex] = 'mine';
    }

    // Place specified diamonds on the board
    let diamondsPlaced = 0;
    for (let i = 0; i < totalCells && diamondsPlaced < diamonds; i++) {
        if (cells[i] === '') {
            cells[i] = 'diamond';
            diamondsPlaced++;
        }
    }

    // Fill remaining blank cells with default diamonds
    for (let i = 0; i < totalCells; i++) {
        if (cells[i] === '') {
            cells[i] = 'defaultDiamond';
        }
    }

    const board = document.getElementById('board');
    board.innerHTML = '';
    cells.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell ' + cell;
        board.appendChild(cellDiv);
    });

    const { multiplier, minIncreaseOnLoss, winningChance } = calculateResults(mines, diamonds);
    const winAmount = betSize * multiplier;
    const results = `
<strong>Multiplier is:</strong> ${multiplier}x<br>
<strong>Min. Increase on Loss is:</strong> ${minIncreaseOnLoss}%<br>
<strong>Winning Chance is:</strong> ${winningChance}%<br>
<strong>Win Amount:</strong> $${winAmount.toFixed(2)}
`;
    document.getElementById('results').innerHTML = results;
}
