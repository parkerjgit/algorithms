/*
You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

source: Climbing stairs (lc 70) - https://leetcode.com/problems/climbing-stairs/
*/

// dynamic bottom-up with re-used cache
var doubleStep = function(n) {
    let [minus2, minus1] = [1, 1];
    for (let i = 2; i <= n; i++) {
        [minus2, minus1] = [minus1, minus1 + minus2];
    }
    return minus1;
};

// dynamic bottom-up (tabulation)
var doubleStep = function(n) {
    let dp = [1,1]; // not nec to prefill 1d array in javascript
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

// dynamic top-down (memoization)
var doubleStep = function(n, memo=[1,1]) {
    if (!memo[n]) {
        memo[n] = doubleStep(n-1, memo) + doubleStep(n-2, memo);
    }
    return memo[n];
}

// recursion without memoization (TLE)
var doubleStep = function(n) {
  if (n == 0) return 1;
  if (n == 1) return 1;

  return doubleStep(n-1) + doubleStep(n-2);
}
