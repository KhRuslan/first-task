document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    const gameTimeInput = document.getElementById('game-time');
    const timeHeader = document.getElementById('time-header');
    const resultHeader = document.getElementById('result-header');
    const timeDisplay = document.getElementById('time');
    const resultDisplay = document.getElementById('result');
    const gameField = document.getElementById('game');
  
    let score = 0;
    let isGameStarted = false;
    let gameTime = 0;
    let gameInterval = null;
  
    startButton.addEventListener('click', startGame);
    gameTimeInput.addEventListener('input', setGameTime);
  
    function startGame() {
      score = 0;
      setGameTime();
      isGameStarted = true;
      gameTimeInput.setAttribute('disabled', true);
      timeHeader.classList.remove('hide');
      resultHeader.classList.add('hide');
      startButton.classList.add('hide');
      gameField.style.backgroundColor = '#fff';
  
      gameInterval = setInterval(updateTime, 100);
  
      renderBox();
    }
  
    function setGameTime() {
      const time = parseFloat(gameTimeInput.value);
      gameTime = time;
      timeDisplay.textContent = gameTime.toFixed(1);
      timeHeader.classList.remove('hide')
      resultHeader.classList.add('hide')
    }
  
    function updateTime() {
      if (!isGameStarted) return;
  
      gameTime -= 0.1;
      timeDisplay.textContent = gameTime.toFixed(1);
    
      if (gameTime <= 0) {
        endGame();
      }
    }
  
    function endGame() {
      isGameStarted = false;
      clearInterval(gameInterval);
      gameField.innerHTML = '';
      gameField.style.backgroundColor = '#ccc';
      startButton.classList.remove('hide');
      gameTimeInput.removeAttribute('disabled');
      timeHeader.classList.add('hide');
      resultHeader.classList.remove('hide');
      resultDisplay.textContent = score;
    }
  
    function renderBox() {
      gameField.innerHTML = '';
  
      const box = document.createElement('div');
      const boxSize = getRandom(30, 100);
      const gameFieldSize = gameField.getBoundingClientRect();
      const maxTop = gameFieldSize.height - boxSize;
      const maxLeft = gameFieldSize.width - boxSize;
      const randomColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
  
      box.style.width = `${boxSize}px`;
      box.style.height = `${boxSize}px`;
      box.style.position = 'absolute';
      box.style.top = `${getRandom(0, maxTop)}px`;
      box.style.left = `${getRandom(0, maxLeft)}px`;
      box.style.backgroundColor = randomColor;
      box.style.cursor = 'pointer';
      box.setAttribute('data-box', true);
  
      gameField.appendChild(box);
  
      box.addEventListener('click', boxClickHandler);
    }
  
    function boxClickHandler() {
      if (!isGameStarted) return;
  
      score++;
      renderBox();
    }
  
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  });
  