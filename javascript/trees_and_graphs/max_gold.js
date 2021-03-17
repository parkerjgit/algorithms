/*
In a gold mine grid of size m * n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.

Return the maximum amount of gold you can collect under the conditions:

Every time you are located in a cell you will collect all the gold in that cell.
From your position you can walk one step to the left, right, up or down.
You can't visit the same cell more than once.
Never visit a cell with 0 gold.
You can start and stop collecting gold from any position in the grid that has some gold.

source: Path with Maximum Gold (leetcode 1219) - https://leetcode.com/problems/path-with-maximum-gold/
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function(grid) {
  let maxSoFar = 0;

  for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
          if (grid[r][c] > 0) {
              maxSoFar = Math.max(maxSoFar, dft(grid, r, c));
          }
      }
  }
  return maxSoFar;
};

const isInBounds = (grid, row, col) => {
  return [
      row >= 0,
      col >= 0,
      row < grid.length,
      col < grid[0].length
  ].every(x => x);
}

const getNeighbors = (grid, row, col) => {
  return [
      [row+1,col],
      [row-1,col],
      [row,col+1],
      [row,col-1]
  ].filter(
      ([r,c]) => isInBounds(grid,r,c)
  );
}

var dft = function(grid, row, col) {

  if (grid[row][col] == 0) {
      return 0;
  }

  // get gold in this cell
  let temp = grid[row][col];
  grid[row][col] = 0;

  // get gold in neighbor cells and take best
  let best = temp;
  for (let [r,c] of getNeighbors(grid, row, col)) {
      best = Math.max(best, temp + dft(grid, r, c));
  }

  // backtrack!
  grid[row][col] = temp

  return best;
}
