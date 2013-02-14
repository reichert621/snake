var SnakeUI = {};

SnakeUI.makeSnakeGameController = function () {
  return {
    _board: null,
    _snake: null,
    _el: null,

    handleKeyEvent: function (event) {
      switch (event.keyCode) {
      case 38:
        this._snake.turn('N');
        break;
      case 39:
        this._snake.turn('E');
        break;
      case 40:
        this._snake.turn('S');
        break;
      case 37:
        this._snake.turn('W');
        break;
      }
    },

    step: function () {
      this._snake.move();
      this._el.html(this._board.renderBoard());
    },

    bind: function (element) {
      this._el = $(element);
      this._board = Snake.makeBoard(20);
      this._snake = Snake.makeSnake(this._board, 'S');
      this._board.addSnake(this._snake);
    },

    runLoop: function () {
      this.step();

      window.setTimeout(this.runLoop.bind(this), 400);
    },

    run: function () {
      $(window).keydown(this.handleKeyEvent.bind(this));
      this.runLoop();
    }
  };
};

$(function () {
  var snakeGameController = SnakeUI.makeSnakeGameController();

  snakeGameController.bind($("#canvas")[0]);
  snakeGameController.run();
});
