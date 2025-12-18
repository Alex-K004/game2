// src/game/GameBoard.js
export default class GameBoard {
  constructor() {
    this.boardElement = document.getElementById('game-board');
    this.cells = [];
    this.activeCell = null;
    
    if (!this.boardElement) {
      console.error('Game board element not found!');
      return;
    }
    
    this.init();
  }

  init() {
    console.log('Initializing game board...');
    this.boardElement.innerHTML = '';
    this.cells = [];

    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.dataset.testid = `cell-${i}`;
      this.cells.push(cell);
      this.boardElement.appendChild(cell);
    }
    console.log(`Created ${this.cells.length} cells`);
  }

  getCell(index) {
    return this.cells[index] || null;
  }

  setActiveCell(index) {
    // Remove active class from previous cell
    if (this.activeCell !== null && this.activeCell !== undefined) {
      const prevCell = this.cells[this.activeCell];
      if (prevCell) {
        prevCell.classList.remove('active');
        prevCell.style.background = '';
      }
    }

    // Set new active cell
    this.activeCell = index;
    if (index !== null && index !== undefined) {
      const cell = this.cells[index];
      if (cell) {
        cell.classList.add('active');
        cell.style.background = 'rgba(255, 107, 107, 0.2)';
      }
    }
  }

  clearActiveCell() {
    if (this.activeCell !== null && this.activeCell !== undefined) {
      const cell = this.cells[this.activeCell];
      if (cell) {
        cell.classList.remove('active');
        cell.style.background = '';
      }
      this.activeCell = null;
    }
  }

  clearAllCells() {
    console.log('Clearing all cells');
    this.cells.forEach(cell => {
      if (cell) {
        // Clear content but keep the cell element
        const img = cell.querySelector('img, .goblin');
        if (img && img.parentNode === cell) {
          cell.removeChild(img);
        }
        cell.classList.remove('active');
        cell.style.background = '';
      }
    });
    this.activeCell = null;
  }

  placeGoblin(goblinElement, cellIndex) {
    console.log(`Placing goblin at cell ${cellIndex}`);
    
    // First clear any existing goblin
    this.clearAllCells();
    
    const cell = this.cells[cellIndex];
    if (cell && goblinElement) {
      // Clone the element to avoid DOM issues
      const goblinClone = goblinElement.cloneNode(true);
      cell.appendChild(goblinClone);
      this.setActiveCell(cellIndex);
      return true;
    }
    return false;
  }

  getRandomCell(previousIndex = null) {
    let newIndex;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      newIndex = Math.floor(Math.random() * 16);
      attempts++;
      if (attempts > maxAttempts) {
        console.warn('Max attempts reached finding new cell');
        break;
      }
    } while (newIndex === previousIndex && previousIndex !== null);
    
    console.log(`Selected random cell: ${newIndex} (previous: ${previousIndex})`);
    return newIndex;
  }

  addClickListener(callback) {
    if (!this.boardElement) {
      console.error('Cannot add click listener: board element not found');
      return;
    }
    
    this.boardElement.addEventListener('click', (event) => {
      const cell = event.target.closest('.cell');
      if (cell) {
        const index = parseInt(cell.dataset.index, 10);
        console.log(`Cell clicked: ${index}`);
        if (!isNaN(index)) {
          callback(index);
        }
      }
    });
    
    console.log('Click listener added to game board');
  }
}