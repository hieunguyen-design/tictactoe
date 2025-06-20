//Create new Table
const GameBoard = (function () {
  let gameBoard = new Array(9);
  let players = new Array(2);

  function showGameBoard() {
    return gameBoard;
  }
  function showPlayers() {
    return players;
  }
  function countEmptySlot() {
    let emptyCounter = 0;
    for (let i = 0; i < gameBoard.length; i++) {
      if (!gameBoard[i]) {
        emptyCounter++;
      }
    }
    return emptyCounter;
  }

  function countPlayer() {
    let playerCounter = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i]) {
        playerCounter++;
      }
    }
    return playerCounter;
  }

  function reset() {
    gameBoard = new Array(9);
    console.log("Gameboard has been reseted");
  }

  function addPlayer(name, mark) {
    const playerName = name;
    const playerMark = mark;
    if (countPlayer() === 0) {
      players[0] = { playerName, playerMark };
    } else {
      players[1] = { playerName, playerMark };
    }
    return { playerName, playerMark };
  }
  function getPlayer(index) {
    // console.log(players[index - 1]);
    return players[index - 1];
  }
  function makeStep(index, player) {
    //check if index valid
    if (index >= 9) {
      console.log("Index is not valid");
    } else if (gameBoard[index]) {
      console.log("This slot has been played. Please try another slot.");
    } else {
      gameBoard[index] = player.playerMark;
      console.log(`Player ${player.playerName} played at ${index}`);
    }
  }

  return {
    showGameBoard,
    showPlayers,
    countEmptySlot,
    countPlayer,
    reset,
    addPlayer,
    getPlayer,
    makeStep,
  };
})();

console.log(GameBoard.countEmptySlot());
console.log(GameBoard.countPlayer());
console.log(GameBoard.addPlayer("Hieu", "X"));
console.log(GameBoard.addPlayer("Nhi", "O"));
// console.log(GameBoard.showPlayers());
GameBoard.makeStep(4, GameBoard.getPlayer(2));
// console.log(GameBoard.showGameBoard());
GameBoard.makeStep(2, GameBoard.getPlayer(1));
// console.log(GameBoard.showGameBoard());

for (let i = 0; i < 10; i++) {
  GameBoard.makeStep(i, GameBoard.getPlayer(2));
}
GameBoard.makeStep(7, GameBoard.getPlayer(1));
console.log(GameBoard.showGameBoard());
GameBoard.reset();
console.log(GameBoard.showGameBoard());
