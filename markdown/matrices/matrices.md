# Matrices

## Notes

**strategy**

1. zoom out and explore problem conceptually first
1. zoom in and explore a trivial example
1. list test cases: empty matrix, 1x1, 1x3, 3x1, 3x3, 4x5 matrix
1. anticipate approach:
    1. counting -> think dynamic programming and look for how cell values might be calculated from previous/neighboring cell values. Think about what initial cell values should be so you can start on (1,1).
    1. path finding -> think dft
    1. overlapping subproblems -> consider top-down memoization
    1. bounding function -> consider backtracking
    1. shortest path finding -> think bft

---
## Warm-up

1. pre-fill matrix with 0's/null
2. process all cells in matrix
3. process all valid neighbors of a cell
4. process all boundary cells
5. sum values in matrix/submatrix
6. copy matrix
7. convert between 1d and 2d representations
8. transpose a matrix

---
## Counts number of paths to target if movement is restricted to two directions with and w/out obstacles.

Number of paths from a cell to a target cell is the sum of the number of paths from all cells accessible from that cell. If movement is restricted to two directions, eg right and down, this becomes a straight forward bottom-up dp problem. Initialize dp table cells to 1 (because there is one path to target from cells in the same row or column as target cell) and start filling in table values back-to-front from cell (1,1) b/c easier to traverse matrix in forward direction, ie from upper left to bottom right, and we know number of path will be the same.

Time: O(nm)
Space: O(nm) - cache can be reused for O(n) space b/c really only need previous row and previous val in current row to calculate current cell.

```js
var uniquePaths = function(m, n) {
  let dp = [...Array(m)].map(row=>Array(n).fill(1));

  for (let r = 1; r < m; r++) {
      for (let c = 1; c < n; c++) {
          dp[r][c] = dp[r-1][c] + dp[r][c-1];
      }
  }

  return dp[m-1][n-1];
};
```
see [full implementation](./javascript/matrices/count_paths.js)

---
## Count number of paths to target if movement is restricted to 4 directions

tbd...

---
## Count square matrices

1 + min(left,diag,top)

```js
var countSquares = function(mat) {
  let [m, n] = [mat.length, mat[0].length];

  // overwrite mat
  let tab = mat;

  // first row/col are done, so start on (1,1)
  for (let r = 1; r < m; r++) {
      for (let c = 1; c < n; c++) {
          if (mat[r][c] === 1) {
              tab[r][c] = 1 + Math.min(tab[r][c-1], tab[r-1][c], tab[r-1][c-1]);
          }
      }
  }

  // return sum of all cells
  return tab.reduce((sum, row) => {
      return sum + row.reduce((a, b)=> a + b, 0)
  }, 0);
};
```
see [full implementation](./javascript/matrices/count_square_submatrices.js)

---
## Count rectangular submatrices

```js
var countRectangles = function (matrix) {
  let [m, n] = [matrix.length, matrix[0].length];

  // overwrite matrix O(1)
  let table = matrix;

  // process rows. O(nm)
  for (let r = 0; r < m; r++) {
    for (let c = 1; c < n; c++) { // first c is done
      if (table[r][c] === 1) {

        // cell = 1 + previous(left) cell
        table[r][c] = 1 + table[r][c - 1];

      }
    }
  }

  // copy table 1 O(n)
  let table2 = table.map(r => [...r]);

  // process cs. O(nm2)
  for (let r = 1; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (table[r][c] > 0) {

        // cell = running min sum of cells above
        let [i, run, min] = [r, 0, table[r][c]];
        while (i >= 0 && table[i][c] > 0) {
          min = Math.min(min, table[i][c]);
          run += min;
          i--;
        }
        table2[r][c] = run;

      }
    }
  }

  // return sum of all cells O(nm)
  ...
};
```
see [full implementation](./../../javascript/matrices/count_rectangular_submatrices.js)

---
## Paint bucket

```js
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
```

---
## Count closed regions

```js
var countClosedRegions = function(grid) {

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
```

---
## Capture closed regions

```js
var captureClosedRegions = function(board) {

  if(board.length < 3) return board

  // temp mark open regions
  for(var r=0;r<board.length;r++){
      for(var c=0;c<board[0].length;c++){
          if(board[r][c] == 'O' && isBorderCell(board, [r,c])){
            dfs(board, [r,c])
          }
      }
  }

  // capture closed, and reset marked cells
  for(var r=0;r<board.length;r++){
      for(var c=0;c<board[0].length;c++){
          board[r][c] = ({ 'T': 'O', 'X': 'X', 'O': 'X' })[board[r][c]]
      }
  }

  return board
};
```

---
## Collect Max Gold

```js
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
```
(see [full implementation](./../../javascript/trees_and_graphs/max_gold.js))

---
## More problems

1. alphabet board path - see [full implementation](javascript/trees_and_graphs/alphabet_board_path.js)
If computing leaf-to-root representation, then add new_digit*base^depth to number (at each step), e.g., to add bit in MSB position of binary number `x = x + newbit*(2**d)`, where d is 2's position of MSB (i.e., the current depth)
2. submatrix sums - see [solution](./../../javascript/matrices/submatrix_sum.js)
1. Is cell reachable given obstacles
1. maze solver - see [solution](./../../javascript/trees_and_graphs/maze_solver.js)
1. tic tac toe - see [solution](./../../javascript/matrices/tic_tac_toe.js)
