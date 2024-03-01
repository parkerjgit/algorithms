export const problems = [
  {
    problem: "You are climbing a staircase. It takes n steps to reach the top.Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    source: "Climbing stairs (lc 70) - https://leetcode.com/problems/climbing-stairs/",
    solutions: [
      {
        description: "dynamic bottom-up with re-used cache",
        fn: function(n) {
          let [minus2, minus1] = [1, 1];
          for (let i = 2; i <= n; i++) {
            [minus2, minus1] = [minus1, minus1 + minus2];
          }
          return minus1;
        }
      },
      {
        description: "dynamic bottom-up (tabulation)",
        fn: function(n) {
          let dp = [1,1]; // not nec to prefill 1d array in javascript
          for (let i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
          }
          return dp[n];
        }
      },
      {
        description: "dynamic top-down (memoization)",
        fn: function recurse(n, memo=[1,1]) {
          if (!memo[n]) {
            memo[n] = recurse(n-1, memo) + recurse(n-2, memo);
          }
          return memo[n];
        }
      },
      {
        description: "recursion without memoization (TLE)",
        fn: function recurse(n) {
          if (n == 0) return 1;
          if (n == 1) return 1;

          return recurse(n-1) + recurse(n-2);
        }
      }
    ],
    tests: [
      {
        expectation: 'returns number of distinct ways can you climb to the top for n = 0',
        params: [0],
        expected_output: 1
      },
      {
        expectation: 'returns number of distinct ways can you climb to the top for n = 1',
        params: [1],
        expected_output: 1
      },
      {
        expectation: 'returns number of distinct ways can you climb to the top for n = 2',
        params: [2],
        expected_output: 2
      },
      {
        expectation: 'returns number of distinct ways can you climb to the top for n = 3',
        params: [3],
        expected_output: 3
      },
      {
        expectation: 'returns number of distinct ways can you climb to the top for n = 10',
        params: [10],
        expected_output: 89
      },
      {
        expectation: 'returns number of distinct ways can you climb to the top for n = 20',
        params: [20],
        expected_output: 10946
      }
    ]
  }
]
