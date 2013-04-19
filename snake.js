var SnakeGame = (function () {
  function Coord(i, j) {
    this.i = i;
    this.j = j;
  }

  Coord.prototype.plus = function (coord2) {
    var that = this;

    return new Coord(that.i + coord2.i, that.j + coord2.j);
  };

  function Snake(board, symbol) {
    this.dir = 'N';
    this.symbol = symbol;

    var center = new Coord(board.dim / 2, board.dim / 2);
    this.segments = [center];
  }

  Snake.prototype.turn = function (dir) {
    var that = this;

    that.dir = dir;
  };

  Snake.prototype.move = function () {
    var that = this;
    var head = _.last(that.segments);

    var diff = null;
    switch (that.dir) {
    case 'N':
      diff = new Coord(-1, 0);
      break;
    case 'E':
      diff = new Coord(0, 1);
      break;
    case 'S':
      diff = new Coord(1, 0);
      break;
    case 'W':
      diff = new Coord(0, -1);
      break;
    }

    that.segments.push(head.plus(diff));
    that.segments.shift();
  };

  function Board(dim) {
    this.dim = dim;
    this.snakes = [];
  }

  Board.prototype.addSnake = function (snake) {
    var that = this;

    that.snakes.push(snake);
  };

  Board.prototype.render = function () {
    var that = this;

    var grid = Board.blankGrid(that.dim);
    _.each(that.snakes, function (snake) {
      _.each(snake.segments, function (seg) {
        grid[seg.i][seg.j] = snake.symbol;
      });
    });

    // join it up
    return _.map(
      grid,
      function (row) { return row.join(""); }
    ).join("\n");
  }

  Board.blankGrid = function (dim) {
    return _.times(dim, function () {
      return _.times(dim, function () {
        return ".";
      });
    });
  };

  return {
    Board: Board,
    Coord: Coord,
    Snake: Snake
  }
})();
