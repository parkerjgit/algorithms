/*
Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.

source: Count square submatrices (leetcode 1277) - https://leetcode.com/problems/count-square-submatrices-with-all-ones/submissions/
*/


/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function(matrix) {
  let [m, n] = [matrix.length, matrix[0].length];

  // overwrite matrix
  let table = matrix;
  
  // first row/col are done, so start on (1,1)
  for (let row = 1; row < m; row++) {
      for (let col = 1; col < n; col++) {
          if (matrix[row][col] === 1) {       
              table[row][col] = 1 + Math.min(table[row][col-1], table[row-1][col], table[row-1][col-1]);     
          } 
      }
  }
  
  // return sum of all cells
  return table.reduce((sum, row) => {
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
