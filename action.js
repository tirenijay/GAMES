const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');
const gameWidth = gameContainer.clientWidth;
const gameHeight = gameContainer.clientHeight;
let playerPosition = gameWidth / 2 - 25;
let gameOver = false;
let score = 0;

document.addEventListener('keydown', movePlayer);
restartButton.addEventListener('click', restartGame);

function movePlayer(event) {
    if (gameOver) return;

    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 10;
    } else if (event.key === 'ArrowRight' && playerPosition < gameWidth - 50) {
        playerPosition += 10;
    }

    player.style.left = `${playerPosition}px`;
}

function createFallingObject() {
    const fallingObject = document.createElement('div');
    fallingObject.classList.add('falling-object');
    fallingObject.style.left = `${Math.random() * (gameWidth - 30)}px`;
    gameContainer.appendChild(fallingObject);

    let fallingSpeed = 2 + Math.random() * 3;
    let objectPosition = 0;

    function fall() {
        if (gameOver) return;

        objectPosition += fallingSpeed;
        fallingObject.style.top = `${objectPosition}px`;

        if (objectPosition > gameHeight - 30) {
            const playerRect = player.getBoundingClientRect();
            const objectRect = fallingObject.getBoundingClientRect();

            if (
                objectRect.left < playerRect.right &&
                objectRect.right > playerRect.left &&
                objectRect.bottom > playerRect.top &&
                objectRect.top < playerRect.bottom
            ) {
                endGame();
                return;
            }

            fallingObject.remove();
            updateScore();
        } else {
            requestAnimationFrame(fall);
        }
    }

    requestAnimationFrame(fall);
}

function updateScore() {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
}

function endGame() {
    gameOver = true;
    gameOverScreen.classList.remove('hidden');
}

function restartGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    gameOverScreen.classList.add('hidden');
    playerPosition = gameWidth / 2 - 25;
    player.style.left = `${playerPosition}px`;
}

setInterval(() => {
    if (!gameOver) createFallingObject();
}, 1000);
