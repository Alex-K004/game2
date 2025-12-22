import './styles/main.css';
import Game from './game/Game.js';

// Инициализация игры при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('Goblin Whacker Game Initializing...');

  try {
    // Создаем экземпляр игры
    const game = new Game();

    // Для отладки делаем доступным в консоли
    window.game = game;

    console.log('✅ Game initialized successfully!');
    console.log('👉 Use "game.startGame()" in console to start the game');
  } catch (error) {
    console.error('❌ Error initializing game:', error);

    // Показываем сообщение об ошибке
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #1a1a2e;
      color: #ff6b6b;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: Arial, sans-serif;
      text-align: center;
      z-index: 9999;
    `;

    errorDiv.innerHTML = `
      <h1 style="margin-bottom: 20px;">⚠️ Game Loading Error</h1>
      <p style="margin-bottom: 10px; color: #a9b7c6;">${error.message}</p>
      <p style="color: #a9b7c6;">Please check the console for details.</p>
    `;

    document.body.appendChild(errorDiv);
  }
});
