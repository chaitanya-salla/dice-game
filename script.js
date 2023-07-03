'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newEl = document.querySelector('.btn--new');
const rollEl = document.querySelector('.btn--roll');
const holdEl = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

rollEl.addEventListener('click', () => {
  if (isPlaying) {
    // Genrate a random dice
    const randomDiceNum = Math.floor(Math.random() * 6) + 1;

    // Display Dice
    diceEl.src = `dice-${randomDiceNum}.png`;
    diceEl.classList.remove('hidden');

    console.log(randomDiceNum);
    if (randomDiceNum === 1) {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    } else {
      currentScore += randomDiceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .getElementById(`current--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .getElementById(`current--${activePlayer}`)
    .classList.toggle('player--active');
};

holdEl.addEventListener('click', () => {
  if (isPlaying) {
    const currentScore = Number(
      document.getElementById(`current--${activePlayer}`).textContent
    );
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

newEl.addEventListener('click', () => {
  score[0] = 0;
  score[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  isPlaying = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player1El.classList.add('player--active');
});
