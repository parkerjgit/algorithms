# Matrices

## Notes

* asdf

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
see [full implementation](./javascript/matrices/count_rectangular_submatrices.js)

---
## asdf
