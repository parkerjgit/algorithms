/*
Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Implement the NumMatrix class:

NumMatrix(int[][] matrix) initializes the object with the integer matrix matrix.
int sumRegion(int row1, int col1, int row2, int col2) returns the sum of the elements of the matrix array inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
-105 <= matrix[i][j] <= 105
0 <= row1 <= row2 < m
0 <= col1 <= col2 < n
At most 104 calls will be made to sumRegion.

source: https://leetcode.com/problems/range-sum-query-2d-immutable/
*/

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {

  // problem calls for immutable. could otherwise use the imput matrix as dp table
  const dp = [...Array(matrix.length).keys()].map(row => [...matrix[row]])

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      let top  = (r > 0)          ? dp[r-1][c]   : 0,
          left = (c > 0)          ? dp[r][c-1]   : 0,
          diag = (r > 0 && c > 0) ? dp[r-1][c-1] : 0;

      dp[r][c] = matrix[r][c] + top + left - diag;
    }
  }

  this.sum = dp;
};

/**
* @param {number} row1
* @param {number} col1
* @param {number} row2
* @param {number} col2
* @return {number}
*/
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  let top  = (row1 > 0)             ? this.sum[row1-1][col2]   : 0,
      left = (col1 > 0)             ? this.sum[row2][col1-1]   : 0,
      diag = (row1 > 0 && col1 > 0) ? this.sum[row1-1][col1-1] : 0;

  return this.sum[row2][col2] - top - left + diag;
};

/**
* Your NumMatrix object will be instantiated and called as such:
* var obj = new NumMatrix(matrix)
* var param_1 = obj.sumRegion(row1,col1,row2,col2)
*/

// based on solution https://leetcode.com/problems/range-sum-query-2d-immutable/solution/

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {

  const dp = [...Array(matrix.length + 1)].map(row => Array(matrix[0].length + 1).fill(null))
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
          dp[i + 1][j + 1] = dp[i][j + 1] + dp[i + 1][j] - dp[i][j] + matrix[i][j]
      }
  }

  this.sum = dp;
};

/**
* @param {number} row1
* @param {number} col1
* @param {number} row2
* @param {number} col2
* @return {number}
*/
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  return this.sum[row2 + 1][col2 + 1] - (this.sum[row2 + 1][col1] + this.sum[row1][col2 + 1] - this.sum[row1][col1])
};
