
const playerFactory = (name, sign, moveArray) => {
  return {name, sign, moveArray};
}

const display = (() => {
  const gameContainer = document.querySelector('.game-container');
  const gameFinishedDisplay = document.querySelector('.game-finished-display');

  const chooseNames = () => {
    gameContainer.innerHTML = `
      <form class="name-form">
        <input id="p1" type="text" name="" placeholder="Who is Noughts?">
        <input id="p2" type="text" name="" placeholder="Who is Crosses?">
        <input class="form-btn" type=button name="" value="Start Game">
      </form>
    `;

    const formBtn = gameContainer.querySelector('.form-btn');
    formBtn.addEventListener('click', (e)=> {
      e.preventDefault();
      const p1Name = gameContainer.querySelector('#p1').value;
      const p2Name = gameContainer.querySelector('#p2').value;
      console.log({p1Name, p2Name});
      game.startGame(p1Name, p2Name);
    });
  }

  const drawBoard = (gameArray) => {
    gameContainer.replaceChildren();
    let index = 0;
    gameArray.map(tile => {
      let gameTile = document.createElement('div');
      gameTile.innerHTML =`<div id=${index} class="game-tile">${tile}</div>`;
      gameContainer.appendChild(gameTile);
      gameTile.addEventListener('click', game.playerPlaceSign);
      index++;
    });
  }

  const gameWinMessage = (winningThree, winner) => {
    winningThree.map(i => {
      console.log(i);
      const winningTile = document.getElementById(String(i));
      winningTile.style.color = 'green';
    });
    gameFinishedDisplay.innerHTML = `<div>${winner} wins the game</div>`;
  }
  return {chooseNames, drawBoard, gameWinMessage};
})();


const game = (() => {
  let gameArray = [
    '.', '.', '.', '.', '.', '.', '.', '.', '.'
  ];
  let turn = 0;
  let p1;
  let p2;

  const winCheck = (playerArray, winner) => {
      const winArray = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]];

      winArray.map(set => {
        const test = set.every(i => {
          return playerArray.includes(i);
        });
        if (test){
          display.gameWinMessage(set, winner);
        }
      });
    }

  const startGame = (p1Name, p2Name) => {
    p1 = playerFactory(p1Name, 'O', []);
    p2 = playerFactory(p2Name, 'X', []);
    display.drawBoard(gameArray);
  }

  const playerPlaceSign = (e) => {
    const tileIndex = Number(e.target.id);
    let playerArray;
    let winner;
    if (gameArray[tileIndex] === '.') {
      if (turn % 2 == 0) {
        p1.moveArray.push(tileIndex);
        gameArray.splice(tileIndex, 1, p1.sign);
        playerArray = p1.moveArray;
        winner = p1.name;
      } else {
        p2.moveArray.push(tileIndex);
        gameArray.splice(tileIndex, 1, p2.sign);
        playerArray = p2.moveArray;
        winner = p2.name;
      }
      turn++;
      display.drawBoard(gameArray);
      winCheck(playerArray, winner);
    }
  }

  const resetGame = () => {
    gameArray = [
      '.', '.', '.', '.', '.', '.', '.', '.', '.'
    ];
    p1.moveArray = [];
    p2.moveArray = [];
    turn = 0;
  }

  const resetBtn = document.querySelector('.reset-btn');
  resetBtn.addEventListener('click', ()=> {
    resetGame();
    display.chooseNames();
  });

  return {startGame, playerPlaceSign, resetGame};
})();

// Starts the game:
display.chooseNames();
