// src/game/Score.js
export default class Score {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.scoreElement = document.getElementById('score');
    this.missesElement = document.getElementById('misses');
    
    if (!this.scoreElement || !this.missesElement) {
      console.error('Score elements not found!');
    }
    
    this.updateDisplay();
  }

  addPoint() {
    this.score++;
    console.log(`Score: +1 = ${this.score}`);
    this.updateDisplay();
    this.animateScore();
    return this.score;
  }

  addMiss() {
    this.misses++;
    console.log(`Miss: +1 = ${this.misses}/${this.maxMisses}`);
    this.updateDisplay();
    this.animateMisses();
    return this.misses;
  }

  updateDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
    if (this.missesElement) {
      this.missesElement.textContent = this.misses;
    }
    
    // Update misses color based on count
    if (this.missesElement) {
      if (this.misses >= this.maxMisses - 2) {
        this.missesElement.style.color = '#ff6b6b';
        this.missesElement.style.fontWeight = 'bold';
      } else {
        this.missesElement.style.color = '';
        this.missesElement.style.fontWeight = '';
      }
    }
  }

  animateScore() {
    if (this.scoreElement) {
      this.scoreElement.style.transform = 'scale(1.5)';
      this.scoreElement.style.color = '#4dffea';
      this.scoreElement.style.transition = 'all 0.3s';
      
      setTimeout(() => {
        this.scoreElement.style.transform = 'scale(1)';
        this.scoreElement.style.color = '';
      }, 300);
    }
  }

  animateMisses() {
    if (this.missesElement) {
      this.missesElement.style.transform = 'scale(1.5)';
      this.missesElement.style.color = '#ff6b6b';
      this.missesElement.style.transition = 'all 0.3s';
      
      setTimeout(() => {
        this.missesElement.style.transform = 'scale(1)';
      }, 300);
    }
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    console.log('Score reset');
    this.updateDisplay();
  }

  hasLost() {
    return this.misses >= this.maxMisses;
  }

  getScore() {
    return this.score;
  }

  getMisses() {
    return this.misses;
  }
}