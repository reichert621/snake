var _ = require('underscore');

var Snake = {
  makeSnake: function (board, symbol) {
    return {
      _board: board,
      symbol: symbol,
      segments: [{
        x: board.dim / 2,
        y: board.dim / 2
      }]
    }
  },

  makeBoard: function (dim) {
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
            grid[seg.x][seg.y] = snake.symbol;
          });
        });

        // join it up
        return _.map(grid, function (row) { return row.join(""); }).join("\n");
      }
    }
  }
}

module.exports = Snake;
