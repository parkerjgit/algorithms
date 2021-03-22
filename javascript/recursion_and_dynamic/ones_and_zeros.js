/*
You are given an array of binary strings strs and two integers m and n.
Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.
A set x is a subset of a set y if all elements of x are also elements of y.

Constraints:

1 <= strs.length <= 600
1 <= strs[i].length <= 100
strs[i] consists only of digits '0' and '1'.
1 <= m, n <= 100

source:
*/

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, M, N) {

  // dp [m][n][i] -> max size of subset for m,n remaining, from i (including or excluding ith string)
  let dp = [...Array(M+1)].map(row => [...Array(N+1)].map(x => []));

  // count 0's and 1's in string i, ie
  const getCost = (str) => {
    let cost = {zeros: 0, ones: 0};
    for (let c of strs[i]) {
        if (c == '0') cost.zeros++;
        if (c == '1') cost.ones++;
    }
    return cost;
  }

  const _maxVal = (candidates, capacity, i) => { // here m/n repr. 0's/1's *capacityRemaining*!!

      let {zeros, ones} = capacity;

      if (i > candidates.length - 1)
          return 0;
      if (zeros < 0 || ones < 0)
          return 0;
      if (dp[zeros][ones][i] != undefined)
          return dp[zeros][ones][i];

      // 1. get the value & cost of inclusion
      let cost = getCost(candidates[i]);
      let value = 1;

      // 2. get max value for include/exclude case
      let include = value + _maxVal({zeros: zeros - cost.zeros, ones: ones - cost.ones}, i+1), // "value" of all strings is 1
          exclude = _maxVal({zeros, ones}, i+1);

      // 3. try including it and excluding it if can afford it, else exclude it.
      if (cost.zeros > zeros || cost.ones > ones) {
          dp[zeros][ones][i] = exclude;
      } else {
          dp[zeros][ones][i] = Math.max(include, exclude);
      }

      return dp[zeros][ones][i];
  };

  return _maxVal(strs, {zeros: M, ones: N},0);
};


// this not quite working

var findMaxForm = function(strs, m, n) {

  function getCount(str) {
      let [mi,ni] = [0,0];
      for (let c of str) {
          if (c == '0') mi++;
          if (c == '1') ni++;
      }
      return [mi, ni];
  }

  //let dp = [...Array(m+1)].map(row => Array(n+1).fill(0));
  //let dp = [...Array(m+1)].map(row => [...Array(n+1)].map(z => Array(strs.length).fill(0)));
  let dp = [...Array(strs.length)].map(row => [...Array(m+1)].map(z => Array(n+1).fill(0)));

  for(let i = 0; i < strs.length; i++) {
      const [zeros, ones] = getCount(strs[i]);
      //console.log(zeros,ones)
      // for (let j = m; j >= zeros; j--) {
      //     for (let k = n; k >= ones; k--) {
      //         dp[j][k] = Math.max(dp[j-zeros][k-ones]+1, dp[j][k])
      //     }
      // }

      for (let j = 0; j <= m; j++) {
          for (let k = 0; k <= n; k++) {
              if (zeros > j || ones > k) {
                  dp[i][j][k] = (i > 0) && dp[i-1][j][k] || 0;
              } else {
                  console.log('y',i,j,k,'-')
                  dp[i][j][k] = (i > 0) && Math.max(dp[i-1][j-zeros][k-ones]+1, dp[i-1][j][k]) || 0;
              }
          }
      }
      console.log(dp);
  }

  return dp[strs.length-1][m][n]
};
