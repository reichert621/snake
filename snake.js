(function (root) {
  root.SG = root.SG || {};

  root.SG.Coord = Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  };

  root.SG.Snake = Snake = function (board) {
    this.dir = "N";

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

    this.segments.push(head.plus(Snake.DIFFS[this.dir]));
    this.segments.shift();
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  SG.Board = Board = function (dim) {
    this.dim = dim;
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

  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);

    _(this.snake.segments).each(function (seg) {
      grid[seg.i][seg.j] = Snake.SYMBOL;
    });

    // join it up
    return _(grid).map(function (row) { return row.join(""); }).join("\n");
  };
})(this);
