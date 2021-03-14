/*
Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.

source: Number of Closed Islands (leetcode 1254) - https://leetcode.com/problems/number-of-closed-islands/
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
 var closedIsland = function(grid) {
    
  let count = 0;
  
  // find open islands. fill them
  for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
          if (isBorder(grid, r, c)) {
              fill(grid, r ,c);
          }
      }
  }
  
  // find closed islands. count them and fill them
  for (let r = 1; r < grid.length - 1; r++) {
      for (let c = 1; c < grid[0].length - 1; c++) {
          if (grid[r][c] == 0) {
              count++;
              fill(grid, r, c);
          }
      }
  }
  
  return count;
};

var isBorder = function(grid, row, col) {
  return [
      row == 0,
      col == 0,
      row == grid.length - 1,
      col == grid[0].length - 1
  ].some(x => x)
}

var isInBounds = function(grid, row, col) {
  return [
      row >= 0,
      col >= 0,
      row < grid.length,
      col < grid[0].length
  ].every(x => x);
}

var getNeighbors = function(grid, row, col) {
  return [
      [row - 1, col],
      [row + 1, col], 
      [row, col - 1],
      [row, col + 1]
  ].filter(([r,c]) => isInBounds(grid, r, c) && grid[r][c] == 0)
}

var fill = function(grid, row, col) {
  
  if (grid[row][col] == 1) {
      return;
  }
  
  // flip this cell
  grid[row][col] = 1;
  
  // flip each neighbor
  for (let [r,c] of getNeighbors(grid, row, col)) {
      fill(grid, r, c);
  }
}