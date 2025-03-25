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
  const draggedElement = event.target;

  draggedElement.classList.add('dragging'); // Add dragging class

  // Update position to follow mouse
  function onMouseMove(e) {
    draggedElement.style.left = `${e.pageX - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${e.pageY - draggedElement.offsetHeight / 2}px`;
  }

  document.addEventListener('mousemove', onMouseMove);

  // Remove mousemove listener when drag ends
  draggedElement.addEventListener('dragend', () => {
    draggedElement.classList.remove('dragging');
    draggedElement.style.left = '';
    draggedElement.style.top = '';
    document.removeEventListener('mousemove', onMouseMove);
  });
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  draggedElement.classList.remove('card-dragging'); // Remove grow animation

  const targetTile = event.target;
  const correctTiles = {
    "card_venda": "tile-1",
    "card_consumo": "tile-2",
    "card_coleta": "tile-3",
    "card_cooperativa": "tile-4",
    "card_agregadores": "tile-5",
    "card_industria": "tile-6",
    "card_producao": "tile-7"
  };

  if (correctTiles[draggedElement.id] === targetTile.id) {
    targetTile.appendChild(draggedElement);
    draggedElement.classList.add('card-placed'); // Add shrink animation
    setTimeout(() => {
      draggedElement.classList.remove('card-placed'); // Remove shrink animation after it completes
    }, 300);

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
