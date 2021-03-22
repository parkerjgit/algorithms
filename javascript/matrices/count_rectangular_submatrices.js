/*
Given a rows * columns matrix mat of ones and zeros, return how many submatrices have all ones.

Constraints:

1 <= rows <= 150
1 <= columns <= 150
0 <= mat[i][j] <= 1

source: Count Submatrices With All Ones (lc 1504) - https://leetcode.com/problems/count-submatrices-with-all-ones/
*/

/**
 * @param {number[][]} mat
 * @return {number}
 *
 * Time: O(n3)
 * Space: O(n)
 */
var countRectSubmatrices = function (matrix) {
  let [m, n] = [matrix.length, matrix[0].length];

  // overwrite matrix O(1)
  let table = matrix;

  // process rows. O(nm)
  for (let r = 0; r < m; r++) {
    for (let c = 1; c < n; c++) { // first c is done
      if (table[r][c] === 1) {

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
  return table2.reduce((sum, r) => {
    return sum + r.reduce((a, b) => a + b, 0)
  }, 0);
};
