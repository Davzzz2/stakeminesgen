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
    const roundedResult = Math.round(result * 100) / 100;
    const minIncreaseOnLoss = Math.round((100 / (roundedResult - 1)) * 100) / 100;
    const winningChance = Math.round((99 / roundedResult) * 100000) / 100000;

    return {
        multiplier: roundedResult,
        minIncreaseOnLoss: minIncreaseOnLoss,
        winningChance: winningChance
    };
}

function generateBoard() {
    const mines = parseInt(document.getElementById('mines').value);
    const diamonds = parseInt(document.getElementById('diamonds').value);
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

    // Place diamonds in the remaining cells until the desired number of diamonds is placed
    let diamondsPlaced = 0;
    for (let i = 0; i < totalCells && diamondsPlaced < diamonds; i++) {
        if (cells[i] === '') {
            cells[i] = 'diamond';
            diamondsPlaced++;
        }
    }

    // Ensure any remaining diamonds are placed if not enough blank cells were initially filled
    for (let i = 0; i < totalCells && diamondsPlaced < diamonds; i++) {
        if (cells[i] === '') {
            cells[i] = 'diamond';
            diamondsPlaced++;
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
    const results = `
<strong>Multiplier is:</strong> ${multiplier.toFixed(2)}x<br>
<strong>Min. Increase on Loss is:</strong> ${minIncreaseOnLoss.toFixed(2)}%<br>
<strong>Winning Chance is:</strong> ${winningChance.toFixed(2)}%
`;
    document.getElementById('results').innerHTML = results;
}
