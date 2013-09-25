(function (root) {
  var SG = root.SG = (root.SG || {});

  var Coord = SG.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  };

  var Apple = SG.Apple = function(board) {
    this.board = board;

    var x = Math.floor(Math.random() * board.dim);
    var y = Math.floor(Math.random() * board.dim);

    this.position = new Coord(x,y);
  }

  Apple.prototype.replace = function() {
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);

    this.position = new Coord(x,y);
  }

  var Snake = SG.Snake = function (board) {
    this.dir = "N";
    this.board = board;

    var center = new Coord(board.dim / 2, board.dim / 2);
    this.segments = [center];
  };

  Snake.DIFFS = {
    "N": new Coord(-1, 0),
    "E": new Coord(0, 1),
    "S": new Coord(1, 0),
    "W": new Coord(0, -1)
  };

  Snake.SYMBOL = "S";

  Snake.prototype.move = function () {
    var head = _(this.segments).last();
    var new_head = head.plus(Snake.DIFFS[this.dir]);

    if (this.eatsApple(new_head)) {
      this.segments.push(head.plus(Snake.DIFFS[this.dir]));
      this.board.apple.replace();
    } else if (this.board.validMove(new_head)) {
      this.segments.push(head.plus(Snake.DIFFS[this.dir]));
      this.segments.shift();
    } else {
      this.segments = [];
    }
  };

  Snake.prototype.eatsApple = function(coord) {
    var apple_coord = this.board.apple.position
    return (coord.i == apple_coord.i) && (coord.j == apple_coord.j)
  }

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  var Board = SG.Board = function (dim) {
    this.dim = dim;
    this.apple = new Apple(this);
    this.snake = new Snake(this);
  };

  Board.BLANK_SYMBOL = ".";

  Board.blankGrid = function (dim) {
    return _.times(dim, function () {
      return _.times(dim, function () {
        return Board.BLANK_SYMBOL
      });
    });
  };

  Board.prototype.validMove = function (coord) {
   return (coord.i >= 0) && (coord.i <= 19) && (coord.j >= 0) && (coord.j <= 19)
  }

  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);

    _(this.snake.segments).each(function (seg) {
      grid[seg.i][seg.j] = Snake.SYMBOL;
    });

    // join it up
    return _(grid).map(function (row) { return row.join(""); }).join("\n");
  };
})(this);
