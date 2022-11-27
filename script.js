import Ball from './ball.js';
import Paddle from './Paddle.js'

const ball = new Ball(document.querySelector('#ball'));
const playerScoreElement = document.querySelector('.player-score')
const computerScoreElement = document.querySelector('.computer-score')
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))

let lastTime;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
    }

    if (isLose()) handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

function isLose() {
    const rect = ball.rect();
    return rect.left >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerHeight) {
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
    } else {
        computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset()
}

window.requestAnimationFrame(update);