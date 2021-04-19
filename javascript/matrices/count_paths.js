/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). How many possible unique paths are there?

Constraints:

1 <= m, n <= 100
It's guaranteed that the answer will be less than or equal to 2 * 109.

source: Unique Paths (lc 62) - https://leetcode.com/problems/unique-paths/
*/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let dp = [...Array(m)].map(_=>Array(n).fill(1));

  for (let r = 1; r < m; r++) {
      for (let c = 1; c < n; c++) {
          dp[r][c] = dp[r-1][c] + dp[r][c-1];
      }
  }

  return dp[m-1][n-1];
};
