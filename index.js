
const gameArray = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
let playerOne = true;

const noughtsArray = [];
const crossesArray = [];

function winCheck(playerArray) {
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
      // invoke game won
      //gameWon();
    });
}

function placeSymbol(e){
  let playerSymbol = playerOne ? 'o' : 'x';
  let index = Number(e.target.id);

  // Don't allow placement on occupied tiles:
  if (gameArray[index] === '.') {
    if (playerOne) {
      noughtsArray.push(index);
    } else if (!playerOne) {
      crossesArray.push(index);
    }
    gameArray.splice(index, 1, playerSymbol);
    playerOne = playerOne ? false : true;
    renderDisplay(gameArray);
    winCheck(noughtsArray);
  }
  // IMPROVE - only start checking on round 3
}

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
