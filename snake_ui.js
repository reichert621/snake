(function (root) {
  root.SG = root.SG || {};

  root.SG.View = View = function ($el) {
    this.$el = $el;

    this.board = null;
    this.intervalId = null;
  }

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 500;

  View.prototype.handleKeyEvent = function (event) {
    if (_(View.KEYS).has(event.keyCode)) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    } else {
      // some other key was pressed; ignore.
    }
  };

  View.prototype.step = function () {
    this.board.snake.move();
    this.$el.html(this.board.render());
  };

  View.prototype.start = function () {
    this.board = new SG.Board(20);

    $(window).keydown(this.handleKeyEvent.bind(this));

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );
  };
})(this);
