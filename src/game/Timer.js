// src/game/Timer.js
export default class Timer {
  constructor(interval = 1000) {
    this.interval = interval;
    this.timerElement = document.getElementById('timer');
    this.countdownInterval = null;
    this.timeLeft = interval / 1000;

    if (!this.timerElement) {
      console.error('Timer element not found!');
    }

    this.updateDisplay();
  }

  startCountdown(callback) {
    this.stopCountdown();
    this.timeLeft = this.interval / 1000;
    this.updateDisplay();

    console.log('Starting countdown...');
    this.countdownInterval = setInterval(() => {
      this.timeLeft -= 0.1;
      this.updateDisplay();

      if (this.timeLeft <= 0) {
        this.timeLeft = this.interval / 1000;
        if (callback) {
          console.log('Countdown complete, calling callback');
          callback();
        }
      }
    }, 100);
  }

  stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
      console.log('Countdown stopped');
    }
  }

  updateDisplay() {
    if (this.timerElement) {
      this.timerElement.textContent = this.timeLeft.toFixed(1);

      // Change color based on time left
      if (this.timeLeft < 0.3) {
        this.timerElement.style.color = '#ff6b6b';
        this.timerElement.style.fontWeight = 'bold';
      } else if (this.timeLeft < 0.6) {
        this.timerElement.style.color = '#ffd93d';
        this.timerElement.style.fontWeight = 'bold';
      } else {
        this.timerElement.style.color = '';
        this.timerElement.style.fontWeight = '';
      }
    }
  }

  reset() {
    this.stopCountdown();
    this.timeLeft = this.interval / 1000;
    this.updateDisplay();
    console.log('Timer reset');
  }
}
