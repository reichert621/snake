if (!(typeof(require) === 'undefined')) {
  var _ = require('underscore');
}

var Snake = {};

Snake.coord = function (i, j) {
  return {
    i: i,
    j: j,

    plus: function (c2) {
      return Snake.coord(this.i + c2.i, this.j + c2.j);
    }
  }
};

Snake.makeSnake = function (board, symbol) {
  var center = Snake.coord(board.dim / 2, board.dim / 2);

  return {
    _board: board,
    _dir: 'N',
    symbol: symbol,
    segments: [center],

    turn: function (dir) {
      this._dir = dir;
    },

    move: function () {
      var head = _.last(this.segments);

      var diff = null;
      switch (this._dir) {
      case 'N':
        diff = Snake.coord(-1, 0);
        break;
      case 'E':
        diff = Snake.coord(0, 1);
        break;
      case 'S':
        diff = Snake.coord(1, 0);
        break;
      case 'W':
        diff = Snake.coord(0, -1);
        break;
      }

      this.segments.push(head.plus(diff));
      this.segments.shift();
    }
  }
};

Snake.makeBoard = function (dim) {
  return {
    dim: dim,
    _snakes: [],

    addSnake: function(snake) {
      this._snakes.push(snake);
    },

    _blankGrid: function () {
      var grid = [];

      for (var i = 0; i < this.dim; i++) {
        grid.push([]);
        for (var j = 0; j < this.dim; j++) {
          _.last(grid).push(".");
        }
      }

      return grid;
    },

    renderBoard: function () {
      var grid = this._blankGrid();

      _.each(this._snakes, function (snake) {
        _.each(snake.segments, function (seg) {
          grid[seg.i][seg.j] = snake.symbol;
        });
      });

      // join it up
      return _.map(grid, function (row) { return row.join(""); }).join("\n");
    }
  }
};

if (!(typeof(module) === 'undefined')) {
  module.exports = Snake;
}
