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

    // Place specified diamonds on the board
    let diamondsPlaced = 0;
    for (let i = 0; i < totalCells && diamondsPlaced < diamonds; i++) {
        if (cells[i] === '') {
            cells[i] = 'diamond';
            diamondsPlaced++;
        }
    }

    // Fill remaining blank cells with diamonds
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
    const results = `
<strong>Multiplier is:</strong> ${multiplier.toFixed(2)}x<br>
<strong>Min. Increase on Loss is:</strong> ${minIncreaseOnLoss.toFixed(2)}%<br>
<strong>Winning Chance is:</strong> ${winningChance.toFixed(2)}%
`;
    document.getElementById('results').innerHTML = results;
}
