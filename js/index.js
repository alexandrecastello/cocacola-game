window.addEventListener('load', function () {
  var videoElement = document.getElementById('vid');
  videoElement.removeAttribute('controls');
});

var video = document.getElementById('video');
var gameTutorial = document.getElementById('game-tutorial');
var gamePlay = document.getElementById('game-play');
var gameOver = document.getElementById('game-game-over');
var gameFinal = document.getElementById('game-final');

video.addEventListener('click', () => {
  var videoDiv = document.getElementById('video');
  gameTutorial.removeAttribute('hidden');
  videoDiv.classList.add('fade-out');
  setTimeout(() => {
    videoDiv.setAttribute('hidden', '');
    videoDiv.classList.remove('fade-out');
  }, 500);
});

gameTutorial.addEventListener('click', () => {
  gamePlay.removeAttribute('hidden');
  gameTutorial.classList.add('fade-out');
  setTimeout(() => {
    gameTutorial.setAttribute('hidden', '');
    gameTutorial.classList.remove('fade-out');
  }, 500);
});

gameOver.addEventListener('click', () => {
  if (!gameOver.hasAttribute('hidden')) {
    gameOver.classList.add('fade-out');
    setTimeout(() => {
      gameOver.setAttribute('hidden', '');
      location.reload();
    }, 500);
  }
});

gameFinal.addEventListener('click', () => {
  if (!gameFinal.hasAttribute('hidden')) {
    gameFinal.classList.add('fade-out');
    setTimeout(() => {
      gameFinal.setAttribute('hidden', '');
      location.reload();
    }, 500);
  }
});

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  console.log(draggedElement.id);
  draggedElement.style.top = '';
  draggedElement.style.left = '';
  draggedElement.classList.remove('card-dragging');
  const targetTile = event.target;
  const correctTiles = {
    "card-7": "tile-1",
    "card-3": "tile-2",
    "card-2": "tile-3",
    "card-4": "tile-4",
    "card-1": "tile-5",
    "card-5": "tile-6",
    "card-6": "tile-7"
  };
  if (correctTiles[draggedElement.id] === targetTile.id) {
    targetTile.appendChild(draggedElement);
    if (checkWinCondition(correctTiles)) {
      gamePlay.classList.add('fade-out');
      setTimeout(() => {
        gamePlay.setAttribute('hidden', '');
        gameFinal.removeAttribute('hidden');
      }, 500);
    }
  } else {
    damage();
  }
}

function checkWinCondition(correctTiles) {
  for (const cardId in correctTiles) {
    const tileId = correctTiles[cardId];
    const tile = document.getElementById(tileId);
    if (!tile.firstChild || tile.firstChild.id !== cardId) {
      return false;
    }
  }
  return true;
}

var life3 = document.getElementById('life3');
var life2 = document.getElementById('life2');
var life1 = document.getElementById('life1');
var life0 = document.getElementById('life0');

function damage() {
  if (!life3.hidden) {
    life3.classList.add('rotating');
    setTimeout(() => {
      life3.classList.remove('rotating');
      setTimeout(() => {
        life3.setAttribute('hidden', '');
        life2.removeAttribute('hidden');
      }, 500);
    }, 500);
  } else if (!life2.hidden) {
    life2.classList.add('rotating');
    setTimeout(() => {
      life2.classList.remove('rotating');
      setTimeout(() => {
        life2.setAttribute('hidden', '');
        life1.removeAttribute('hidden');
      }, 500);
    }, 500);
  } else if (!life1.hidden) {
    life1.classList.add('rotating');
    setTimeout(() => {
      life1.classList.remove('rotating');
      setTimeout(() => {
        life1.setAttribute('hidden', '');
        life0.removeAttribute('hidden');
        setTimeout(() => {
          gamePlay.classList.add('fade-out');
          setTimeout(() => {
            gamePlay.setAttribute('hidden', '');
            gameOver.removeAttribute('hidden');
          }, 1000);
        }, 500);
      }, 500);
    }, 500);
  }
}
