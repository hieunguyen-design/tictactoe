//Action buttons
const edit = document.querySelector(".edit");
const playAgain = document.querySelectorAll(".again");
const editModal = document.querySelector(".edit-modal");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");
const player1NameShowed = document.querySelector(".player1NameShowed");
const player2NameShowed = document.querySelector(".player2NameShowed");
const winnerAnnounce = document.querySelector(".winnerAnnouce");
const winnerName = document.getElementById("winnerName");
const winCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // main diagonal
  [2, 4, 6], // anti diagonal
];
//Gameboard
const GameBoard = (function () {
  let gameBoard = new Array(9);

  function showGameBoard() {
    return gameBoard;
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

  function isFull() {
    return countEmptySlot() === 0 ? true : false;
  }

  function reset() {
    // gameBoard.Array.apply(null, Array(9));
    gameBoard = new Array(9);
    console.log("Gameboard has been reseted");
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
    countEmptySlot,
    isFull,
    reset,
    makeStep,
  };
})();
//Players
const Players = (function () {
  let players = new Array(2);

  function showPlayers() {
    return players;
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
  function addPlayer(name, mark) {
    const playerName = name;
    const playerMark = mark;
    const playerTrack = new Array();
    if (countPlayer() === 0) {
      players[0] = { playerName, playerMark, playerTrack };
    } else {
      players[1] = { playerName, playerMark, playerTrack };
    }
    return { playerName, playerMark, playerTrack };
  }
  function getPlayer(index) {
    return players[index - 1];
  }
  function getPlayerMark(index) {
    // console.log(players[index - 1].playerMark);
    return players[index - 1].playerMark;
  }
  function getPlayerName(index) {
    return players[index - 1].playerName;
  }
  function setName(index, name) {
    players[index].playerName = name;
  }
  function getName(index) {
    return players[index - 1].playerName;
  }
  function addTrack(player, box) {
    players[player - 1].playerTrack.push(box);
  }
  function getTrack(index) {
    return players[index - 1].playerTrack;
  }
  function clearTrack() {
    players[0].playerTrack = new Array();
    players[1].playerTrack = new Array();
  }
  return {
    showPlayers,
    countPlayer,
    addPlayer,
    getPlayer,
    getPlayerMark,
    getPlayerName,
    setName,
    getName,
    addTrack,
    getTrack,
    clearTrack,
  };
})();

//GamePlay Managment
const GamePlay = (function () {
  let turn = 1;
  function nextTurn() {
    turn++;
    console.log("End turn, next Player.");
  }
  function turnCounter() {
    return turn;
  }
  function reset() {
    GameBoard.reset();
    Players.clearTrack();
    turn = 1;
  }
  function winnerCheck(playerIndex) {
    return winCombos.some((combo) =>
      combo.every((box) => Players.getTrack(playerIndex).includes(box))
    );
  }
  return { nextTurn, turnCounter, reset, winnerCheck };
})();

// CONSOlE TESTING
// console.log(GameBoard.countEmptySlot());

console.log(Players.addPlayer("Player 1", "X"));
console.log(Players.addPlayer("Player 2", "O"));
// console.log(Players.countPlayer());
// console.log(Players.getPlayerMark(2));
// // console.log(GameBoard.showPlayers());
// GameBoard.makeStep(4, Players.getPlayer(2));
// // console.log(GameBoard.showGameBoard());
// GameBoard.makeStep(2, Players.getPlayer(1));
// // console.log(GameBoard.showGameBoard());

//DOM
const gameBoard = document.querySelector(".gameboard");
let box1 = document.querySelector(".box-1");
let box2 = document.querySelector(".box-2");
let box3 = document.querySelector(".box-3");
let box4 = document.querySelector(".box-4");
let box5 = document.querySelector(".box-5");
let box6 = document.querySelector(".box-6");
let box7 = document.querySelector(".box-7");
let box8 = document.querySelector(".box-8");
let box9 = document.querySelector(".box-9");
let gridBoxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

gridBoxes.forEach((element, index) => {
  element.addEventListener("click", () => {
    let turn = GamePlay.turnCounter();

    if (turn <= 9) {
      let playerTurn = turn % 2 === 0 ? 2 : 1; //1 or 2
      // console.log(playerTurn);
      if (element.textContent === "") {
        element.textContent = Players.getPlayerMark(playerTurn);
        let color = playerTurn == 1 ? "Color-Red" : "Color-Blue";
        element.classList.add(color);
        console.log(
          `${Players.getName(playerTurn)} played at ${index} with ${color}`
        );
        Players.addTrack(playerTurn, index);

        if (GamePlay.winnerCheck(playerTurn)) {
          //Call modal winner
          console.log("Win!");
          winnerName.textContent = Players.getPlayerName(playerTurn);
          winnerName.classList.add(
            playerTurn === 1 ? "Color-Red" : "Color-Blue"
          );
          winnerAnnounce.showModal();
        } else {
          console.log(GamePlay.winnerCheck(playerTurn));
          GamePlay.nextTurn();
        }
        // } else console.log("winner found");
      } else console.log("This place has been played. Try another one.");
    } else {
      console.log("Game ended, start a new game.");
      console.log(Players.getTrack(1));
      console.log(Players.getTrack(2));
    }
  });
});
//Edit Button
edit.addEventListener("click", () => {
  console.log("edit modal showed");
  edit.addEventListener("click", () => {
    editModal.showModal();
  });
});
//Modal Cancel button
cancel.addEventListener("click", () => {
  editModal.close();
});
//Modal Save button
save.addEventListener("click", () => {
  Players.setName(0, player1Name.value);
  Players.setName(1, player2Name.value);
  console.log(Players.getName(1));
  console.log(Players.getName(2));
  player1NameShowed.textContent = Players.getName(1);
  player2NameShowed.textContent = Players.getName(2);
  editModal.close();
});
//Play Again Button
playAgain.forEach((button) => {
  button.addEventListener("click", () => {
    gridBoxes.forEach((element) => {
      element.textContent = "";
      element.classList.remove("Color-Red");
      element.classList.remove("Color-Blue");
    });
    GamePlay.reset();
    winnerAnnounce.close();
  });
});
