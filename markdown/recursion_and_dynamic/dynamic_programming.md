# Dynamic Programming

## Counting Submatrices

```js
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
```

https://leetcode.com/problems/count-square-submatrices-with-all-ones/discuss/518072/Python-O(-m*n-)-sol-by-DP-93%2B-w-Demo
https://leetcode.com/problems/maximal-square/solution/