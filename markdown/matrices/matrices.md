# Matrices

## Notes

* asdf

---
## Warm-up

1. pre-fill matrix with 0's/null
2. process all cells in matrix
3. process all valid neighbors of a cell
4. process all boundary cells
5. sum values of all cells
6. copy matrix
7. convert between 1d and 2d representations
8. transpose a matrix

---
## Count square matrices

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
