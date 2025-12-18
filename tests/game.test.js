import Game from '../src/game/Game.js';
import GameBoard from '../src/game/GameBoard.js';
import Score from '../src/game/Score.js';
import Goblin from '../src/game/Goblin.js';

describe('Goblin Game', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="game-board"></div>
            <div id="score">0</div>
            <div id="misses">0</div>
            <div id="timer">1.0</div>
        `;
    });

    describe('GameBoard', () => {
        test('should create 16 cells', () => {
            const board = new GameBoard();
            expect(board.cells.length).toBe(16);
        });

        test('should get random cell different from previous', () => {
            const board = new GameBoard();
            const prevIndex = 5;
            const newIndex = board.getRandomCell(prevIndex);
            expect(newIndex).not.toBe(prevIndex);
            expect(newIndex).toBeGreaterThanOrEqual(0);
            expect(newIndex).toBeLessThan(16);
        });
    });

    describe('Score', () => {
        test('should initialize with zero', () => {
            const score = new Score();
            expect(score.getScore()).toBe(0);
            expect(score.getMisses()).toBe(0);
        });

        test('should add points', () => {
            const score = new Score();
            score.addPoint();
            expect(score.getScore()).toBe(1);
        });

        test('should detect game over after 5 misses', () => {
            const score = new Score();
            for (let i = 0; i < 5; i++) {
                score.addMiss();
            }
            expect(score.hasLost()).toBe(true);
        });

        test('should reset correctly', () => {
            const score = new Score();
            score.addPoint();
            score.addMiss();
            score.reset();
            expect(score.getScore()).toBe(0);
            expect(score.getMisses()).toBe(0);
        });
    });

    describe('Goblin', () => {
        test('should create goblin element', () => {
            const goblin = new Goblin();
            expect(goblin.element).toBeDefined();
            expect(goblin.element.className).toBe('goblin');
        });

        test('should show and hide correctly', () => {
            const goblin = new Goblin();
            expect(goblin.isVisible()).toBe(false);
            
            goblin.show(3);
            expect(goblin.isVisible()).toBe(true);
            expect(goblin.getPosition()).toBe(3);
            
            goblin.hide();
            expect(goblin.isVisible()).toBe(false);
        });
    });
});