
const playerFactory = (name, symbol, movesArray) => {
  return {name, symbol, movesArray};
}

const renderDisplay = (() => {
  const gameContainer = document.querySelector('.game-container');

  const drawBoard = (gameArray) => {
    gameContainer.replaceChildren();
    let index = 0;
    gameArray.map(tile => {
      let gameTile = document.createElement('div');
      gameTile.innerHTML =`<div id=${index} class="game-tile">${tile}</div>`;
      gameContainer.appendChild(gameTile);
      gameTile.addEventListener('click', game.placeSymbol);
      index++;
    });
  }

  const gameWinMessage = (test, firstPlayerTurn) => {
    const displayMessage = document.querySelector('.display-message');
    if (test) {
       const player = firstPlayerTurn ? 'Player One' : 'Player Two';
       displayMessage.innerText = `${player} Wins!`;
    }
  }

  return {drawBoard, gameWinMessage};
})();

const game = (() => {
  const gameArray = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
  let firstPlayerTurn = true;

  const p1 = playerFactory('p1', 'o', []);
  const p2 = playerFactory('p2', 'x', []);

  const winCheck = (playerArray) => {
      const winArray = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]];
    console.log({playerArray})
        winArray.map(set => {
          const test = set.every(i => {
            return playerArray.includes(i);
          });
          console.log({test});
          // invoke game won message:
          renderDisplay.gameWinMessage(test, firstPlayerTurn);
        });
    }

  const placeSymbol = (e) => {
    let playerSymbol = firstPlayerTurn ? p1.symbol : p2.symbol;
    let index = Number(e.target.id);

    const playerArray = firstPlayerTurn ? p1.movesArray : p2.movesArray;
    // Don't allow placement on occupied tiles:
    if (gameArray[index] === '.') {
      if (firstPlayerTurn) {
        p1.movesArray.push(index);
      } else if (!firstPlayerTurn) {
        p2.movesArray.push(index);
      }
      gameArray.splice(index, 1, playerSymbol);

      renderDisplay.drawBoard(gameArray);
      winCheck(playerArray);

      firstPlayerTurn = firstPlayerTurn ? false : true;
    }
    // IMPROVE - only start checking on round 3
  }

  return {placeSymbol, gameArray};
})();

// start game:
renderDisplay.drawBoard(game.gameArray);



// renderDisplay.drawBoard(['.', '.', '.', '.', '.', '.', '.', '.', '.']);
