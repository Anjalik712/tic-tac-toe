let gameModule = (function () {
  "use strict";
  const currentPlayerDiv = document.querySelector(".currentPlayer");
  const resultDiv = document.querySelector(".result");
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let currentPlayer = "x";
  let gameOver = false;
  currentPlayerDiv.textContent = `Current player: ${currentPlayer}`;

  function handleClick(e) {
    const boxClicked = e.target;
    const index = parseInt(boxClicked.getAttribute("data-key"));
    if (gameBoard[index] !== "" || gameOver) {
      return;
    }
    handlePlay(boxClicked, index);
    handleResult();
  }

  function handlePlay(sqClicked, index) {
    sqClicked.textContent = `${currentPlayer}`;
    gameBoard[index] = currentPlayer;
  }

  function changePlayer() {
    if (currentPlayer === "x") {
      currentPlayer = "o";
    } else {
      currentPlayer = "x";
    }
    currentPlayerDiv.textContent = `Current player: ${currentPlayer}`;
  }

  function handleResult() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
      let a = gameBoard[winningConditions[i][0]];
      let b = gameBoard[winningConditions[i][1]];
      let c = gameBoard[winningConditions[i][2]];
      if (!a || !b || !c) {
        continue;
      }
      if (a === b && b === c) {
        gameWon = true;
        break;
      }
    }
    if (gameWon) {
      resultDiv.textContent = `${currentPlayer} won!`;
      console.log(`${currentPlayer} won!`);
      gameOver = true;
      return;
    }
    let gameTie = !gameBoard.includes("");
    if (gameTie) {
      resultDiv.textContent = "Game tie!";
      console.log("Game tie!");
      gameOver = true;
      return;
    }
    changePlayer();
  }

  function restart() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    document.querySelectorAll(".box").forEach((box) => (box.textContent = ""));
    currentPlayer = "x";
    currentPlayerDiv.textContent = `Current player: ${currentPlayer}`;
    resultDiv.textContent = "";
  }

  return { handleClick, restart };

})();

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => box.addEventListener("click", gameModule.handleClick));
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", gameModule.restart);
