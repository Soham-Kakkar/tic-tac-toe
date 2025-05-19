var shape = 'cross';
let gridCells = document.getElementsByClassName("grid-cell");
let gameOverElement = document.getElementById("game-over");
let gameOver = false;

function victoryCheck() {
  let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let someoneWon = false;

  for (let combination of winningCombinations) {
    let a = gridCells[combination[0]].innerHTML;
    let b = gridCells[combination[1]].innerHTML;
    let c = gridCells[combination[2]].innerHTML;

    if (a !== "" && a === b && b === c) {
      let winnerSymbol = a.includes("x") ? "X" : "O";

      gameOverElement.innerHTML = `
        <div class="result-text">
            Player ${winnerSymbol} wins!
        </div>
        <button class="restart-btn" onclick="window.location.reload()">
            Restart Game
        </button>
      `;
      gameOverElement.style.visibility = "visible";
      someoneWon = true;
      gameOver = true;
      break;
    }
  }

  // Draw check
  if (!someoneWon) {
    let allCellsFilled = true;
    for (let cell of gridCells) {
      if (cell.innerHTML === "") {
        allCellsFilled = false;
        break;
      }
    }

    if (allCellsFilled) {
      gameOverElement.innerHTML = `
        <div class="result-text">
          It's a draw!
        </div>
        <button class="restart-btn" onclick="window.location.reload()">
          Restart Game
        </button>`;
      gameOverElement.style.visibility = "visible";
      gameOver = true;
    }
  }

  if (gameOver) {
    for (let cell of gridCells) {
      cell.style.pointerEvents = "none";
    }
  }
}

for (let cell of gridCells) {
  cell.addEventListener("click", function () {
    if (!gameOver && cell.innerHTML == "") {
      if (shape == 'cross') {
        cell.innerHTML = "<img src='./images/cross.png' alt='x'></img>";
      } else {
        cell.innerHTML = "<img src='./images/circle.png' alt='o'></img>";
      }
      victoryCheck();
      shape = shape === 'cross' ? 'circle' : 'cross';
    }
  });
}
