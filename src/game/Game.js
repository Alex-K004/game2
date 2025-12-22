// src/game/Game.js
import GameBoard from './GameBoard.js';
import Goblin from './Goblin.js';
import Score from './Score.js';
import Timer from './Timer.js';

export default class Game {
  constructor() {
    console.log('Creating Game instance...');

    // Initialize components
    this.board = new GameBoard();
    this.goblin = new Goblin();
    this.score = new Score();
    this.timer = new Timer(1000); // 1 second interval

    this.gameInterval = null;
    this.isPlaying = false;
    this.previousPosition = null;
    this.goblinVisible = false;

    // Bind methods
    this.moveGoblin = this.moveGoblin.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);

    // Initialize
    this.bindEvents();
    this.initControls();

    console.log('Game instance created successfully');
  }

  bindEvents() {
    console.log('Binding game events...');
    this.board.addClickListener(this.handleCellClick);
  }

  handleCellClick(cellIndex) {
    if (!this.isPlaying) {
      console.log('Game is not playing, click ignored');
      return;
    }

    console.log(`Cell ${cellIndex} clicked, goblin at ${this.goblin.getPosition()}, visible: ${this.goblin.isVisible()}`);

    if (this.goblin.isVisible() && cellIndex === this.goblin.getPosition()) {
      // Hit!
      console.log('Goblin hit!');
      this.score.addPoint();
      this.goblin.hide();
      this.board.clearActiveCell();
      this.goblinVisible = false;

      // Visual feedback
      this.showHitEffect(cellIndex);
    } else {
      console.log('Miss!');
    }
  }

  showHitEffect(cellIndex) {
    const cell = this.board.getCell(cellIndex);
    if (cell) {
      cell.style.background = 'rgba(77, 255, 234, 0.3)';
      setTimeout(() => {
        if (cell.style.background.includes('77, 255, 234')) {
          cell.style.background = '';
        }
      }, 300);
    }
  }

  initControls() {
    console.log('Initializing controls...');

    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const gameOverModal = document.getElementById('game-over-modal');

    if (!startBtn || !pauseBtn || !resetBtn) {
      console.error('Control buttons not found!');
      return;
    }

    startBtn.addEventListener('click', () => {
      console.log('Start button clicked');
      this.start();
      startBtn.disabled = true;
      pauseBtn.disabled = false;
    });

    pauseBtn.addEventListener('click', () => {
      console.log('Pause button clicked');
      this.pause();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    });

    resetBtn.addEventListener('click', () => {
      console.log('Reset button clicked');
      this.reset();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    });

    if (playAgainBtn && gameOverModal) {
      playAgainBtn.addEventListener('click', () => {
        console.log('Play again button clicked');
        gameOverModal.classList.remove('active');
        this.reset();
        this.start();
        startBtn.disabled = true;
        pauseBtn.disabled = false;
      });
    }

    console.log('Controls initialized');
  }

  start() {
    if (this.isPlaying) {
      console.log('Game is already playing');
      return;
    }

    console.log('Starting game...');
    this.isPlaying = true;
    this.timer.startCountdown(this.moveGoblin);

    // Initial goblin placement
    setTimeout(() => {
      if (this.isPlaying) {
        this.moveGoblin();
      }
    }, 100);

    console.log('Game started');
  }

  pause() {
    if (!this.isPlaying) {
      console.log('Game is not playing');
      return;
    }

    console.log('Pausing game...');
    this.isPlaying = false;
    this.timer.stopCountdown();

    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }

    console.log('Game paused');
  }

  reset() {
    console.log('Resetting game...');
    this.pause();
    this.score.reset();
    this.timer.reset();
    this.board.clearAllCells();
    this.goblin.hide();
    this.previousPosition = null;
    this.goblinVisible = false;

    // Hide game over modal if visible
    const gameOverModal = document.getElementById('game-over-modal');
    if (gameOverModal) {
      gameOverModal.classList.remove('active');
    }

    console.log('Game reset');
  }

  moveGoblin() {
    if (!this.isPlaying) {
      console.log('Cannot move goblin: game is not playing');
      return;
    }

    console.log('Moving goblin...');

    // Check if game over
    if (this.score.hasLost()) {
      console.log('Game over - too many misses');
      this.gameOver();
      return;
    }

    // Get new position (different from previous)
    const newPosition = this.board.getRandomCell(this.previousPosition);
    console.log(`New position: ${newPosition}, Previous: ${this.previousPosition}`);

    // If goblin was visible but not clicked, count as miss
    if (this.goblin.isVisible() && this.goblinVisible) {
      console.log('Goblin missed!');
      this.score.addMiss();
      this.goblinVisible = false;

      // Check if game over after miss
      if (this.score.hasLost()) {
        console.log('Game over after miss');
        this.gameOver();
        return;
      }
    }

    // Show goblin in new position
    console.log('Showing goblin...');
    const goblinElement = this.goblin.show(newPosition);
    const placed = this.board.placeGoblin(goblinElement, newPosition);

    if (placed) {
      this.previousPosition = newPosition;
      this.goblinVisible = true;
      console.log(`Goblin placed at position ${newPosition}`);
    } else {
      console.error('Failed to place goblin');
    }
  }

  gameOver() {
    console.log('Game over sequence starting...');
    this.pause();

    // Update final score
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) {
      finalScoreElement.textContent = this.score.getScore();
      console.log(`Final score: ${this.score.getScore()}`);
    }

    const gameOverModal = document.getElementById('game-over-modal');
    if (gameOverModal) {
      gameOverModal.classList.add('active');
      console.log('Game over modal shown');
    }

    // Enable start button
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;

    console.log('Game over sequence completed');
  }

  // For debugging
  getStatus() {
    return {
      playing: this.isPlaying,
      score: this.score.getScore(),
      misses: this.score.getMisses(),
      goblinVisible: this.goblinVisible,
      goblinPosition: this.goblin.getPosition(),
      previousPosition: this.previousPosition,
    };
  }
}
