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

  // Check for draw
  let allCellsFilled = true;
  for (let cell of gridCells) {
    if (cell.innerHTML === "") {
      allCellsFilled = false;
      break;
    }
  }

  for (let combination of winningCombinations) {
    if (gridCells[combination[0]].innerHTML === gridCells[combination[1]].innerHTML && gridCells[combination[1]].innerHTML === gridCells[combination[2]].innerHTML && gridCells[combination[0]].innerHTML !== "") {
      gameOverElement.innerHTML = `
    <div class="result-text">
        Player ${shape === 'cross' ? 'X' : 'O'} wins!
    </div>
    <button class="restart-btn" onclick="window.location.reload()">
        Restart Game
    </button>
`;
      gameOverElement.style.visibility = "visible";
      gameOver = true;
    }
    else if (allCellsFilled) {
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

  if (gameOver) document.querySelectorAll('.grid-cell').style.pointerEvents = "none";
}

for (let cell of gridCells) cell.addEventListener("click", function () {
  if (!gameOver) {
    if (cell.innerHTML == "") {
      if (shape == 'cross') cell.innerHTML = "<img src='https://clipartcraft.com/images/x-transparent-big-1.png' alt='x'></img>";
      else if (shape == 'circle') cell.innerHTML = "<img src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmarufrahman.com%2Ftic-tac-toe%2Fimg%2Fcircle.png&f=1&nofb=1&ipt=c88ea90a8613094484dc4fef6d0d6bb46156dd0a3e9397b9b693b7d34f215572&ipo=images' alt='o'></img>";
      victoryCheck();
      shape = shape === 'cross' ? 'circle' : 'cross';
    }
  }
});