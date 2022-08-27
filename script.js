'use strict';
// Selectors for DOM
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Game Values
const scores = [0, 0];
const totalScores = [0, 0];
let currentScore = 0;
let currentPlayer = 0;

// Initialize game
const gameInit = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  diceEl.classList.add('hidden');
  // Rolling dice
  btnRoll.addEventListener('click', diceRoll);
  // Hold eventlistener
  btnHold.addEventListener('click', holdScore);
  btnNew.addEventListener('click', resetGame);
};

const changeTurns = () => {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Handles dice roll functionality
const diceRoll = () => {
  let dice = Math.floor(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `assets//dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    changeTurns();
  }
};

// Handles the hold button functionality
const holdScore = () => {
  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  if (scores[currentPlayer] >= 100) {
    // Signify winning playing on dom
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    // Addd 1 to total score for winning player
    totalScores[currentPlayer] += 1;
    // Update dom for total scores
    document.querySelector(`.player--${currentPlayer}-score`).textContent =
      totalScores[currentPlayer];
    // Remove event listeners
    btnRoll.removeEventListener('click', diceRoll);
    btnHold.removeEventListener('click', holdScore);
  } else {
    changeTurns();
  }
};

const resetGame = () => {
  gameInit();
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
};

gameInit();
