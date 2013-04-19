var SnakeUI = (function () {
  var stepMillis = 500;

  function SnakeGameView(el) {
    this.$el = $(el);

    this.board = null;
    this.intervalId = null;
    this.snake = null;
  }

  SnakeGameView.prototype.handleKeyEvent = function (event) {
    var that = this;

    switch (event.keyCode) {
    case 38:
      that.snake.turn('N');
      break;
    case 39:
      that.snake.turn('E');
      break;
    case 40:
      that.snake.turn('S');
      break;
    case 37:
      that.snake.turn('W');
      break;
    }
  };

  SnakeGameView.prototype.step = function () {
    var that = this;

    that.snake.move();
    that.$el.html(that.board.render());
  };

  SnakeGameView.prototype.start = function () {
    var that = this;

    that.board = new SnakeGame.Board(20);
    that.snake = new SnakeGame.Snake(that.board, 'S');
    that.board.addSnake(that.snake);

    $(window).keydown(that.handleKeyEvent.bind(that));
    that._startStepLoop();
  };

  SnakeGameView.prototype._startStepLoop = function () {
    var that = this;

    that.intervalId = window.setInterval(
      that.step.bind(that),
      stepMillis
    );
  };

  return {
    SnakeGameView: SnakeGameView
  };
})();
