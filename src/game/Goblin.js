// src/game/Goblin.js - упрощенная версия
export default class Goblin {
  constructor() {
    this.element = null;
    this.currentPosition = null;
    this.init();
  }

  init() {
    this.element = this.createGoblinElement();
  }

  createGoblinElement() {
    const goblin = document.createElement('div');
    goblin.className = 'goblin';
    goblin.innerHTML = '👹';
    goblin.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      cursor: pointer;
    `;
    
    return goblin;
  }

  show(position) {
    console.log(`Showing goblin at position ${position}`);
    this.currentPosition = position;
    return this.element;
  }

  hide() {
    console.log('Hiding goblin');
    this.currentPosition = null;
    return null;
  }

  isVisible() {
    return this.currentPosition !== null;
  }

  getPosition() {
    return this.currentPosition;
  }
}