
// game board obj MODULE (IIFE)
const gameBoard = (() => {
  const gameArray = ['x', 'o', 'o', 'o', 'x', 'o', 'o', 'o', 'x'];

  return { gameArray };
})();


// display controller MODULE (IIFE)
const renderDisplay = (gameArray) => {
  const gameContainer = document.querySelector('.game-container');
  let index = 0;

  gameArray.map(tile => {
    let gameTile = document.createElement('div');
    gameTile.innerHTML =`<div name="index" class="game-tile">${tile}</div>`;
    gameContainer.appendChild(gameTile);
    index++;
  });
}

renderDisplay(gameBoard.gameArray);

// player obj FACTORY

// game obj - controls game flow
