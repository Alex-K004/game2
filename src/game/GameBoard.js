export default class GameBoard {
  constructor() {
    this.boardElement = document.getElementById('game-board');
    this.cells = [];
    this.activeCell = null;
    this.totalCells = 16; // 4x4 grid
    this.init();
  }

  init() {
    if (!this.boardElement) {
      console.error('Game board element not found');
      return;
    }

    this.boardElement.innerHTML = '';
    this.cells = [];

    for (let i = 0; i < this.totalCells; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.cells.push(cell);
      this.boardElement.appendChild(cell);
    }
  }

  getCell(index) {
    return this.cells[index] || null;
  }

  setActiveCell(index) {
    if (this.activeCell !== null) {
      this.cells[this.activeCell]?.classList.remove('active');
    }

    this.activeCell = index;
    if (index !== null && this.cells[index]) {
      this.cells[index].classList.add('active');
    }
  }

  clearActiveCell() {
    if (this.activeCell !== null) {
      this.cells[this.activeCell]?.classList.remove('active');
      this.activeCell = null;
    }
  }

  clearAllCells() {
    this.cells.forEach((cell) => {
      // Используем remove вместо removeChild
      const goblin = cell.querySelector('.goblin');
      if (goblin) {
        goblin.remove();
      }
      cell.classList.remove('active');
    });
    this.activeCell = null;
  }

  placeGoblin(goblinElement, cellIndex) {
    if (!goblinElement || cellIndex < 0 || cellIndex >= this.totalCells) {
      return false;
    }

    this.clearAllCells();

    const cell = this.cells[cellIndex];
    if (cell) {
      // Используем append вместо appendChild
      cell.append(goblinElement);
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
      newIndex = Math.floor(Math.random() * this.totalCells);
      attempts += 1;
    } while (newIndex === previousIndex && attempts < maxAttempts);

    return newIndex;
  }

  addClickListener(callback) {
    this.boardElement?.addEventListener('click', (event) => {
      const cell = event.target.closest('.cell');
      if (cell) {
        const index = parseInt(cell.dataset.index, 10);
        callback(index);
      }
    });
  }
}
