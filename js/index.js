window.addEventListener('load', function () {
  var videoElement = document.getElementById('vid');
  videoElement.removeAttribute('controls');
});

var video = document.getElementById('video');
var gameTutorial = document.getElementById('game-tutorial');
var gamePlay = document.getElementById('game-play');
var gameOver = document.getElementById('game-game-over');

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

var life3 = document.getElementById('life3');
var life2 = document.getElementById('life2');
var life1 = document.getElementById('life1');

life3.addEventListener('click', () => {
  life3.classList.add('glowing');
  life2.removeAttribute('hidden');
  setTimeout(() => {
    life3.classList.remove('glowing');
  }, 500);
  life3.setAttribute('hidden', '');
})

life2.addEventListener('click', () => {
  life2.classList.add('glowing');
  life1.removeAttribute('hidden');
  setTimeout(() => {
    life2.classList.remove('glowing');
  }, 500);
  life2.setAttribute('hidden', '');
})

life1.addEventListener('click', () => {
  life1.classList.add('glowing');
  life0.removeAttribute('hidden');
  setTimeout(() => {
    life1.classList.remove('glowing');
  }, 500);
  life1.setAttribute('hidden', '');
  setTimeout(() => {
    gameOver.removeAttribute('hidden');
    gamePlay.style.display = 'none';
  }, 500);
})

gameOver.addEventListener('click', () => {
  location.reload();
})
