const statusDisplay = document.querySelector('.game--status');
const gameMode = document.querySelectorAll('.game--mode');
const restartButton = document.getElementById('restartButton');
const chooseButtonMode = document.getElementById('chooseModeButton');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

restartButton.style.display = "none";

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


let computerWay = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const compMode = () => {
    restartButton.style.display = "inline";
    chooseButtonMode.style.display = "inline";
    document.getElementById('vsComp').style.display = "none";
    document.getElementById('vsFriend').style.display = "none";

    const winningMessage = () => `Kamu  Menang!`;
    const losingMessage = () => `Kamu  Kalah!`;
    const drawMessage = () => `DRAW!`;

    const scoreDisplay = document.querySelector('.game--score');

    let userScore = 0;
    let compScore = 0;

    scoreDisplay.innerHTML = `User = ${userScore}    ||  Computer = ${compScore}`;

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        computerWay = computerWay.filter(e => e !== clickedCellIndex)
        clickedCell.innerHTML = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function computerMove() {
        const ind = computerWay[Math.floor(Math.random() * (computerWay.length - 1))];

        gameState[ind] = currentPlayer;
        const indCell = ind.toString();
        const cell = document.getElementById(indCell);
        cell.innerHTML = currentPlayer;
        computerWay = computerWay.filter(e => e !== ind);
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '')
                continue;
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            statusDisplay.style.display = "inline";

            if (currentPlayer === 'X') {
                statusDisplay.innerHTML = winningMessage();
                userScore++;
            } else {
                statusDisplay.innerHTML = losingMessage();
                compScore++;
            }

            scoreDisplay.innerHTML = `User = ${userScore}    ||  Computer = ${compScore}`;
            gameActive = false;
            return true;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive)
            return;

        handleCellPlayed(clickedCell, clickedCellIndex);
        if (handleResultValidation()) return;
        computerMove();
        if (handleResultValidation()) return;
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        statusDisplay.style.display = "none";
        computerWay = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }


    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
}

const friendMode = () => {
    restartButton.style.display = "inline";
    statusDisplay.style.display = "inline";
    chooseButtonMode.style.display = "inline";
    document.getElementById('vsComp').style.display = "none";
    document.getElementById('vsFriend').style.display = "none";

    const winningMessage = () => `Player ${currentPlayer} Menang!`;
    const drawMessage = () => `DRAW!`;
    const currentPlayerTurn = () => ` Giliran : ${currentPlayer}`;

    statusDisplay.innerHTML = currentPlayerTurn();

    const scoreDisplay = document.querySelector('.game--score');
    let human1Score = 0;
    let human2Score = 0;

    scoreDisplay.innerHTML = `Player X = ${human1Score}    ||  Player O = ${human2Score}`;

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '')
                continue;
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            if (currentPlayer === 'X') human1Score++;
            else human2Score++;

            scoreDisplay.innerHTML = `Player X = ${human1Score}    ||  Player O = ${human2Score}`;
            gameActive = false;
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive)
            return;

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }


    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
}

gameMode.forEach(buttonMode => buttonMode.addEventListener('click', () => {
    const mode = buttonMode.id;
    if (mode == 'vsComp') compMode();
    else friendMode();
}));

chooseButtonMode.addEventListener('click', () => {
    location.reload();
})