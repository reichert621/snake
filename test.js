var Snake = require('./snake');

var board = Snake.makeBoard(10);
var snake = Snake.makeSnake(board, 'S');
board.addSnake(snake);

console.log(board.renderBoard());
