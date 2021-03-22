/*
Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.

source: Count square submatrices (leetcode 1277) - https://leetcode.com/problems/count-square-submatrices-with-all-ones/submissions/
*/


/**
 * @param {number[][]} matrix
 * @return {number}
 */
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

/*********************** first attempt *************************/

function countSquares(matrix) {
	let [m,n] = [matrix.length, matrix[0].length];
	let k = Math.min(m,n);
	let count = 0;

	// prefill with null
	let tab = [...Array(m+1)].map(row => {
        return [...Array(n+1)].map(col => {
          return Array(k+1).fill(0);
        })
      })

	for (let i = 1; i <= k; i++) {
		for (let r = 0; r < m; r++) {
			for (let c = 0; c < n; c++) {
				if (i === 1) {
					tab[r][c][i] = matrix[r][c];
				} else {
					tabulate(tab, r, c, i);
				}

				if (tab[r][c][i]){
					count++;
				}
			}
		}
	}

	return count;
}

function tabulate(tab, r, c, i) {
    tab[r][c][i] = [
        tab[r][c][i-1],
        tab[r+1][c][i-1],
        tab[r][c+1][i-1],
        tab[r+1][c+1][i-1],
    ].every(x=>x===1) ? 1 : 0;
}
