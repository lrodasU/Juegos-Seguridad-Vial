const gameContainer = document.getElementById('gameContainer');
const car = document.getElementById('car');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const finalTime = document.getElementById('finalTime');
const finalScore = document.getElementById('finalScore');
const pause = document.getElementById('pause');
var modal = document.getElementById("gameOverModal");
var btn = document.getElementById("btn");
const lanes = [25, 125, 225];
let isPaused = false;
let currentLane = 1;
let obstacles = [];
let startTime;
let timerInterval;
let lastSpawn = 0;
let spawnInterval = .5;
let elapsedTime;
let score = 0;

function moveCar(direction) {
    if (direction === 'left' && currentLane > 0) {
        currentLane--;
    } else if (direction === 'right' && currentLane < 2) {
        currentLane++;
    }
    car.style.left = lanes[currentLane] + 'px';
}

function createObstacle() {
    lastSpawn = elapsedTime;
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    const randomLane = Math.floor(Math.random() * 3);
    obstacle.style.left = lanes[randomLane] + 0 + 'px';
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    if (isPaused)
        return;
    obstacles.forEach((obstacle, index) => {
        const top = parseInt(obstacle.style.top || '-100px');
        if (top > 600) {
            obstacle.remove();
            obstacles.splice(index, 1);
            score++;
        } else {
            obstacle.style.top = (top + 5) + 'px';
            checkCollision(obstacle);
        }
    });
}

function checkCollision(obstacle) {
    const obstacleRect = obstacle.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();
    if (obstacleRect.left < carRect.right &&
        obstacleRect.right > carRect.left &&
        obstacleRect.top < carRect.bottom &&
        obstacleRect.bottom > carRect.top) {
        isPaused = true;
        openModal();
    }
}

function resetGame() {
    console.log("reseting");
    isPaused = false;
    score = 0;
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];
    currentLane = 1;
    car.style.left = lanes[currentLane] + 'px';
    clearInterval(timerInterval);
    timerDisplay.textContent = '0:00';
    lastSpawn = 0;
    elapsedTime = 0;
    startTimer();
    //gameLoop();
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (isPaused)
        return;
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function gameLoop() {
    if (isPaused)
        pause.style.display = "block";
    else
        pause.style.display = "none";
    moveObstacles();
    scoreDisplay.textContent = score.toString().padStart(4, '0');
    if (elapsedTime > lastSpawn + spawnInterval && !isPaused) {
        createObstacle();
    }
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'P' || event.key == 'p')
        isPaused = !isPaused;
    if (isPaused)
        return;
    if (event.key == 'A' || event.key == 'a' || event.key == 'ArrowLeft') {
        moveCar('left');
    } else if (event.key == 'D' || event.key == 'd' || event.key == 'ArrowRight') {
        moveCar('right');
    }
});

document.addEventListener('visibilitychange', function () {
    if (modal.style.display == "block")
        return;
    var status = document.getElementById('status');
    if (document.hidden) {
        isPaused = true;
    } else {
        isPaused = false;
    }
});

// Get the modal


// Get the <span> element that closes the modal


// When the user clicks on <span> (x), close the modal
function openModal() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    finalTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    finalScore.textContent = score.toString().padStart(4, '0');
    modal.style.display = "block";

}
function closeModal() {
    modal.style.display = "none";
    resetGame();
}

btn.onclick = function () {
    closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

startTimer();
gameLoop();
