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
  videoDiv.setAttribute('hidden', '');
  gameTutorial.removeAttribute('hidden');
});

gameTutorial.addEventListener('click', () => {
  gameTutorial.setAttribute('hidden', '')
  gamePlay.removeAttribute('hidden')
  gamePlay.style.display = 'flex';
})

gameOver.addEventListener('click', () => {
  location.reload();
})

gameFinal.addEventListener('click', () => {
  location.reload();
})

// Drag and drop

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
  const targetTile = event.target;
  const correctTiles = {
    "card_agregadores": "tile-5",
    "card_coleta": "tile-3",
    "card_consumo": "tile-2",
    "card_cooperativa": "tile-4",
    "card_industria": "tile-6",
    "card_producao": "tile-7",
    "card_venda": "tile-1"
  };

  if (correctTiles[draggedElement.id] === targetTile.id) {
    targetTile.appendChild(draggedElement);
    targetTile.classList.add('glow');
    setTimeout(() => {
      targetTile.classList.remove('glow');
    }, 1000);

    if (checkWinCondition(correctTiles)) {
      gamePlay.style.display = 'none';
      gameFinal.removeAttribute('hidden');
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
          gameOver.removeAttribute('hidden');
          gamePlay.style.display = 'none';
        }, 500);
      }, 500);
    }, 500);
  }
}
