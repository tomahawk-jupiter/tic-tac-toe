
const playerFactory = (name, sign, moveArray) => {
  return {name, sign, moveArray};
}

const display = (() => {
  const gameContainer = document.querySelector('.game-container');

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

  const gameWinMessage = (winningThree) => {
    winningThree.map(i => {
      console.log(i);
      const winningTile = document.getElementById(String(i));
      winningTile.style.color = 'green';

      
    });
  }

  return {chooseNames, drawBoard, gameWinMessage};
})();



const game = (() => {
  const gameArray = [
    '.', '.', '.', '.', '.', '.', '.', '.', '.'
  ];
  let turn = 0;
  let p1;
  let p2;

  const winCheck = (playerArray) => {
      const winArray = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]];

        winArray.map(set => {
          const test = set.every(i => {
            return playerArray.includes(i);
          });
          if (test){
            display.gameWinMessage(set);
          }
          // invoke game won message:
          //renderDisplay.gameWinMessage(test, firstPlayerTurn);
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
    if (gameArray[tileIndex] === '.') {
      if (turn % 2 == 0) {
        p1.moveArray.push(tileIndex);
        gameArray.splice(tileIndex, 1, p1.sign);
        playerArray = p1.moveArray;
      } else {
        p2.moveArray.push(tileIndex);
        gameArray.splice(tileIndex, 1, p2.sign);
        playerArray = p2.moveArray;
      }
      turn++;
      display.drawBoard(gameArray);
      winCheck(playerArray);
    }
  }

  return {startGame, playerPlaceSign};
})();

display.chooseNames();

// const playerFactory = (name, symbol, movesArray) => {
//   return {name, symbol, movesArray};
// }
//
// const renderDisplay = (() => {
//   const gameContainer = document.querySelector('.game-container');
//
//   const drawBoard = (gameArray) => {
//     gameContainer.replaceChildren();
//     let index = 0;
//     gameArray.map(tile => {
//       let gameTile = document.createElement('div');
//       gameTile.innerHTML =`<div id=${index} class="game-tile">${tile}</div>`;
//       gameContainer.appendChild(gameTile);
//       gameTile.addEventListener('click', game.placeSymbol);
//       index++;
//     });
//   }
//
//   const gameWinMessage = (test, firstPlayerTurn) => {
//     const displayMessage = document.querySelector('.display-message');
//     if (test) {
//        const player = firstPlayerTurn ? 'Player One' : 'Player Two';
//        displayMessage.innerText = `${player} Wins!`;
//     }
//   }
//
//   return {drawBoard, gameWinMessage};
// })();
//
// const game = (() => {
//   const gameArray = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
//   let firstPlayerTurn = true;
//
//   const p1 = playerFactory('p1', 'o', []);
//   const p2 = playerFactory('p2', 'x', []);
//
//   const winCheck = (playerArray) => {
//       const winArray = [
//         [0,1,2],[3,4,5],[6,7,8],
//         [0,3,6],[1,4,7],[2,5,8],
//         [0,4,8],[2,4,6]];
//     console.log({playerArray})
//         winArray.map(set => {
//           const test = set.every(i => {
//             return playerArray.includes(i);
//           });
//           console.log({test});
//           // invoke game won message:
//           renderDisplay.gameWinMessage(test, firstPlayerTurn);
//         });
//     }
//
//   const placeSymbol = (e) => {
//     let playerSymbol = firstPlayerTurn ? p1.symbol : p2.symbol;
//     let index = Number(e.target.id);
//
//     const playerArray = firstPlayerTurn ? p1.movesArray : p2.movesArray;
//     // Don't allow placement on occupied tiles:
//     if (gameArray[index] === '.') {
//       if (firstPlayerTurn) {
//         p1.movesArray.push(index);
//       } else if (!firstPlayerTurn) {
//         p2.movesArray.push(index);
//       }
//       gameArray.splice(index, 1, playerSymbol);
//
//       renderDisplay.drawBoard(gameArray);
//       winCheck(playerArray);
//
//       firstPlayerTurn = firstPlayerTurn ? false : true;
//     }
//     // IMPROVE - only start checking on round 3
//   }
//
//   return {placeSymbol, gameArray};
// })();
//
// // start game:
// renderDisplay.drawBoard(game.gameArray);
//
//
//
// // renderDisplay.drawBoard(['.', '.', '.', '.', '.', '.', '.', '.', '.']);
