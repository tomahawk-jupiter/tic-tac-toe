
// game board obj MODULE (IIFE)
// return different states for the board
  //const gameArray = ['x', 'o', 'o', 'o', 'x', 'o', 'o', 'o', 'x'];
const gameArray = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
let playerOne = true;

const winCheckArray = [
  [0,1,2],[0,3,6],[3,4,5],
  [6,7,8],[1,4,7],[2,4,6],
  [2,5,8],[0,4,8]];
// compare arrays and see if it contains all numbers of one of the winning arrays.
const noughtsArray = [];
const crossesArray = [];

function placeSymbol(e){
  let playerSymbol = playerOne ? 'o' : 'x';
  let index = e.target.id;
  if (playerOne) {
    noughtsArray.push(index);
  } else if (!playerOne) {
    crossesArray.push(index);
  }
  // Don't allow placement on occupied tiles:
  if (gameArray[index] === '.') {
    gameArray.splice(index, 1, playerSymbol);
    playerOne = playerOne ? false : true;
    renderDisplay(gameArray);
  }
  console.log({crossesArray});
  console.log({noughtsArray});
}

// display controller MODULE (IIFE)
const renderDisplay = (gameArray) => {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.replaceChildren();
  let index = 0;

  gameArray.map(tile => {
    let gameTile = document.createElement('div');
    gameTile.innerHTML =`<div id=${index} class="game-tile">${tile}</div>`;
    gameContainer.appendChild(gameTile);
    gameTile.addEventListener('click', placeSymbol);
    index++;
  });
}

renderDisplay(gameArray);

// player obj FACTORY player(symbol)

// game obj - controls game flow
