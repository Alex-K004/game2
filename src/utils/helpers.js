/**
 * Utility functions for the game
 */

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPosition(previousPosition, totalPositions) {
  let newPosition;
  do {
    newPosition = getRandomInt(0, totalPositions - 1);
  } while (newPosition === previousPosition);
  return newPosition;
}

export function formatTime(seconds) {
  return seconds.toFixed(1);
}

export function createElement(tag, className, text = '') {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}