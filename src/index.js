// src/index.js - Версия с изображением гоблина
class GoblinGame {
    constructor() {
        console.log('🎮 Инициализация игры...');
        
        // Состояние игры
        this.score = 0;
        this.misses = 0;
        this.maxMisses = 5;
        this.isPlaying = false;
        this.currentGoblin = null;
        this.previousPosition = null;
        this.timerInterval = null;
        this.timeLeft = 1.0;
        
        // URL изображения гоблина
        this.goblinImageUrl = 'assets/goblin.png';
        
        // Инициализация
        this.initElements();
        this.initBoard();
        this.bindEvents();
        this.preloadImage();
        
        console.log('✅ Игра готова!');
    }
    
    preloadImage() {
        // Предзагрузка изображения
        this.goblinImage = new Image();
        this.goblinImage.src = this.goblinImageUrl;
        this.goblinImage.onload = () => {
            console.log('✅ Изображение гоблина загружено');
        };
        this.goblinImage.onerror = () => {
            console.error('❌ Ошибка загрузки изображения гоблина');
            // Fallback на эмодзи если изображение не загрузилось
            this.goblinImageUrl = null;
        };
    }
    
    initElements() {
        // Получаем элементы DOM
        this.elements = {
            board: document.getElementById('game-board'),
            score: document.getElementById('score'),
            misses: document.getElementById('misses'),
            timer: document.getElementById('timer'),
            startBtn: document.getElementById('start-btn'),
            pauseBtn: document.getElementById('pause-btn'),
            resetBtn: document.getElementById('reset-btn'),
            gameOverModal: document.getElementById('game-over-modal'),
            finalScore: document.getElementById('final-score'),
            playAgainBtn: document.getElementById('play-again-btn')
        };
        
        // Проверяем что все элементы найдены
        Object.entries(this.elements).forEach(([name, element]) => {
            if (!element) {
                console.error(`❌ Элемент не найден: ${name}`);
            }
        });
    }
    
    initBoard() {
        if (!this.elements.board) {
            console.error('Игровое поле не найдено!');
            return;
        }
        
        // Очищаем поле
        this.elements.board.innerHTML = '';
        this.cells = [];
        
        // Создаем 16 клеток (4x4)
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            this.cells.push(cell);
            this.elements.board.appendChild(cell);
        }
        
        console.log(`✅ Игровое поле создано: ${this.cells.length} клеток`);
    }
    
    bindEvents() {
        // Клики по клеткам
        if (this.elements.board) {
            this.elements.board.addEventListener('click', (e) => {
                const cell = e.target.closest('.cell');
                if (cell) {
                    const index = parseInt(cell.dataset.index);
                    this.handleCellClick(index);
                }
            });
        }
        
        // Кнопка Start
        if (this.elements.startBtn) {
            this.elements.startBtn.addEventListener('click', () => this.startGame());
        }
        
        // Кнопка Pause
        if (this.elements.pauseBtn) {
            this.elements.pauseBtn.addEventListener('click', () => this.pauseGame());
        }
        
        // Кнопка Reset
        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => this.resetGame());
        }
        
        // Кнопка Play Again
        if (this.elements.playAgainBtn && this.elements.gameOverModal) {
            this.elements.playAgainBtn.addEventListener('click', () => {
                this.elements.gameOverModal.classList.remove('active');
                this.resetGame();
                this.startGame();
            });
        }
        
        console.log('✅ События привязаны');
    }
    
    handleCellClick(index) {
        if (!this.isPlaying) return;
        
        console.log(`🎯 Клик по клетке ${index}, гоблин в ${this.currentGoblin}`);
        
        if (this.currentGoblin === index) {
            // Попали по гоблину!
            this.score++;
            if (this.elements.score) {
                this.elements.score.textContent = this.score;
                this.animateElement(this.elements.score, '#4dffea');
            }
            
            // Визуальный эффект попадания
            const cell = this.cells[index];
            if (cell) {
                cell.style.background = 'rgba(77, 255, 234, 0.3)';
                cell.style.borderColor = '#4dffea';
                cell.innerHTML = '🎯';
                
                setTimeout(() => {
                    cell.style.background = '';
                    cell.style.borderColor = '';
                    cell.innerHTML = '';
                    cell.classList.remove('active');
                }, 300);
            }
            
            // Убираем гоблина
            this.hideGoblin();
            console.log(`✅ Попадание! Счет: ${this.score}`);
        }
    }
    
    createGoblinElement() {
        if (this.goblinImageUrl && this.goblinImage.complete) {
            // Используем изображение
            const img = document.createElement('img');
            img.src = this.goblinImageUrl;
            img.alt = 'Goblin';
            img.style.cssText = `
                width: 80%;
                height: 80%;
                object-fit: contain;
                filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.8));
                animation: bounce 0.5s infinite alternate;
                cursor: pointer;
                user-select: none;
            `;
            return img;
        } else {
            // Fallback на эмодзи
            const div = document.createElement('div');
            div.innerHTML = '👹';
            div.style.cssText = `
                font-size: 40px;
                filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.8));
                animation: bounce 0.5s infinite alternate;
                cursor: pointer;
                user-select: none;
            `;
            return div;
        }
    }
    
    showGoblin() {
        // Сначала убираем предыдущего гоблина
        this.hideGoblin();
        
        // Выбираем случайную позицию (не ту же самую)
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * 16);
        } while (newPosition === this.previousPosition);
        
        this.currentGoblin = newPosition;
        this.previousPosition = newPosition;
        
        // Показываем гоблина
        const cell = this.cells[newPosition];
        if (cell) {
            cell.classList.add('active');
            const goblinElement = this.createGoblinElement();
            cell.appendChild(goblinElement);
            console.log(`👹 Гоблин появился в клетке ${newPosition}`);
        }
    }
    
    hideGoblin() {
        if (this.currentGoblin !== null) {
            const cell = this.cells[this.currentGoblin];
            if (cell) {
                cell.classList.remove('active');
                // Удаляем всех детей (гоблина)
                while (cell.firstChild) {
                    cell.removeChild(cell.firstChild);
                }
            }
            this.currentGoblin = null;
        }
    }
    
    moveGoblin() {
        if (!this.isPlaying) return;
        
        // Если гоблин был показан и не пойман - это промах
        if (this.currentGoblin !== null) {
            this.misses++;
            if (this.elements.misses) {
                this.elements.misses.textContent = this.misses;
                this.animateElement(this.elements.misses, '#ff6b6b');
            }
            
            console.log(`❌ Промах! Промахов: ${this.misses}/${this.maxMisses}`);
            
            // Проверяем поражение
            if (this.misses >= this.maxMisses) {
                this.gameOver();
                return;
            }
            
            // Визуальный эффект промаха
            const cell = this.cells[this.currentGoblin];
            if (cell) {
                cell.style.background = 'rgba(255, 107, 107, 0.3)';
                setTimeout(() => {
                    cell.style.background = '';
                }, 300);
            }
        }
        
        // Показываем нового гоблина
        this.showGoblin();
    }
    
    startGame() {
        if (this.isPlaying) return;
        
        console.log('▶ Запуск игры...');
        this.isPlaying = true;
        
        // Обновляем состояние кнопок
        if (this.elements.startBtn) this.elements.startBtn.disabled = true;
        if (this.elements.pauseBtn) this.elements.pauseBtn.disabled = false;
        
        // Запускаем таймер
        this.startTimer();
        
        // Первый гоблин появляется через 0.5 секунды
        setTimeout(() => {
            if (this.isPlaying) {
                this.moveGoblin();
            }
        }, 500);
        
        console.log('✅ Игра запущена!');
    }
    
    pauseGame() {
        if (!this.isPlaying) return;
        
        console.log('⏸ Пауза игры...');
        this.isPlaying = false;
        
        // Обновляем состояние кнопок
        if (this.elements.startBtn) this.elements.startBtn.disabled = false;
        if (this.elements.pauseBtn) this.elements.pauseBtn.disabled = true;
        
        // Останавливаем таймеры
        this.stopTimer();
        
        console.log('✅ Игра на паузе');
    }
    
    resetGame() {
        console.log('🔄 Сброс игры...');
        
        this.pauseGame();
        
        // Сбрасываем счет
        this.score = 0;
        this.misses = 0;
        this.currentGoblin = null;
        this.previousPosition = null;
        this.timeLeft = 1.0;
        
        // Обновляем отображение
        if (this.elements.score) this.elements.score.textContent = '0';
        if (this.elements.misses) this.elements.misses.textContent = '0';
        if (this.elements.timer) {
            this.elements.timer.textContent = '1.0';
            this.elements.timer.style.color = '';
        }
        
        // Очищаем поле
        this.hideGoblin();
        this.cells.forEach(cell => {
            // Удаляем всех детей
            while (cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
            cell.classList.remove('active');
            cell.style.background = '';
            cell.style.borderColor = '';
        });
        
        // Скрываем модальное окно
        if (this.elements.gameOverModal) {
            this.elements.gameOverModal.classList.remove('active');
        }
        
        console.log('✅ Игра сброшена');
    }
    
    startTimer() {
        this.timeLeft = 1.0;
        this.updateTimer();
        
        this.timerInterval = setInterval(() => {
            this.timeLeft -= 0.1;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.timeLeft = 1.0;
                this.moveGoblin();
            }
        }, 100);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimer() {
        if (this.elements.timer) {
            this.elements.timer.textContent = this.timeLeft.toFixed(1);
            
            // Меняем цвет в зависимости от времени
            if (this.timeLeft < 0.3) {
                this.elements.timer.style.color = '#ff6b6b';
            } else if (this.timeLeft < 0.6) {
                this.elements.timer.style.color = '#ffd93d';
            } else {
                this.elements.timer.style.color = '';
            }
        }
    }
    
    gameOver() {
        console.log('🏁 Конец игры!');
        
        this.pauseGame();
        this.hideGoblin();
        
        // Показываем финальный счет
        if (this.elements.finalScore) {
            this.elements.finalScore.textContent = this.score;
        }
        
        // Показываем модальное окно
        if (this.elements.gameOverModal) {
            this.elements.gameOverModal.classList.add('active');
        }
        
        console.log(`🏆 Финальный счет: ${this.score}`);
    }
    
    animateElement(element, color) {
        if (!element) return;
        
        const originalColor = element.style.color;
        element.style.color = color;
        element.style.transform = 'scale(1.2)';
        element.style.transition = 'all 0.3s';
        
        setTimeout(() => {
            element.style.color = originalColor;
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

// Добавляем CSS анимации в документ
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Запускаем игру когда страница загружена
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM загружен, создаем игру...');
    
    try {
        window.game = new GoblinGame();
        console.log('🎉 Игра создана!');
        console.log('💡 Подсказка: в консоли можно использовать game.startGame()');
    } catch (error) {
        console.error('❌ Ошибка при создании игры:', error);
        document.body.innerHTML = `
            <div style="
                text-align: center;
                padding: 50px;
                color: #ff6b6b;
                font-family: Arial, sans-serif;
            ">
                <h1>⚠️ Ошибка загрузки игры</h1>
                <p>${error.message}</p>
                <p>Проверьте консоль для подробностей</p>
            </div>
        `;
    }
});