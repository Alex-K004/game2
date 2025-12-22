import goblinImage from '../assets/goblin.png';

export default class Goblin {
  constructor() {
    this.element = null;
    this.currentPosition = null;
    this.imageUrl = goblinImage;
    this.init();
  }

  init() {
    this.element = this.createGoblinElement();
  }

  createGoblinElement() {
    const img = document.createElement('img');
    img.className = 'goblin';
    img.alt = 'Goblin';
    img.src = this.imageUrl;

    img.style.width = '80%';
    img.style.height = '80%';
    img.style.objectFit = 'contain';
    img.style.cursor = 'pointer';
    img.style.userSelect = 'none';

    return img;
  }

  show(position) {
    this.currentPosition = position;
    return this.element;
  }

  hide() {
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
