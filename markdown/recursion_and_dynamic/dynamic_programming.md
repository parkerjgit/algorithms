# Dynamic Programming

## Counting Submatrices

**bottom-up**

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

---
## Minimum sum of weights (campus bikes II)

**top-down (memoization)**

```js
var assignBikes = function(workers, bikes) {
  ...

  // build dp table top-down
  const table = [...Array(n)].map(row => Array(2**m).fill(null));
  const minSum = (wi, bikeState) => {

      if (wi == n) return 0;
      if (table[wi][bikeState]) return table[wi][bikeState];

      for (let bi = 0; bi < m; bi++) {
          if (getBit(bikeState, bi) == 0) {
              table[wi][bikeState] = Math.min(
                  table[wi][bikeState] || Infinity,
                  distances[wi][bi] + minSum(wi+1, setBit(bikeState, bi))
              )
          }
      }
      return table[wi][bikeState];
  }

  return minSum(0, 0);
};
```
(see [full write-up](./markdown/recursion_and_dynamic/campus_bikes_2.md))

## Count number of ways (or min cost of, etc.) getting to some final state using some finite number moves, ie. ordered knapsack problem?, eg. stair climbing)

**double step stair climbing (ie fibonacci sequence)**

```js
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
```
(see [full implementation](./javascript/recursion_and_dynamic/2_step.js))

**double step with weighted step cost**

```js
var minCostClimbingStairs = function(cost) {
    let [m2, m1] = cost;
    for (let i = 2; i < cost.length; i++) {
        [m2, m1] = [m1, cost[i] + Math.min(m2, m1)];
    }
    return Math.min(m2, m1);
};
```
(see https://leetcode.com/problems/min-cost-climbing-stairs/submissions/)

## Min cost (or max value, etc.) of combining exaustible items (0/1 knapsack problem):

## Max value of combinining exaustible items with variable cost & constant value (ones and zeros problem):

```js
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
```
(see [full implementation](javascript/recursion_and_dynamic/ones_and_zeros.js))

## Min cost of combining inexaustible items, ie. unbounded knapsack problem, eg. coin change problem:

## Find subset that sums to target, ie combination of exaustible items that sum to target:

```js
function subsetSum(arr, i, target) { // from i

    if (target == 0)
        return [true, []];
    if (target < 0)
        return [false, null];
    if (i > arr.length - 1)
        return [false, null];
    if (memo[i][target] != undefined)
        return memo[i][target];

    // try including/excluding ith element
    let include = subsetSum(arr, i+1, target - arr[i]);
    let exclude = subsetSum(arr, i+1, target);

    if (include[0]) {
        memo[i][target] = [true, [...include[1], arr[i]]];
    } else if (exclude[0]) {
        memo[i][target] = [true, exclude[1]];
    } else {
        memo[i][target] = [false, null];
    }

    return memo[i][target];
}
```

if only checking if possible, this can be simplified to

```js
function subsetSum(arr, i, target) { // from i

    if (target == 0)
        return true;
    if (target < 0)
        return false;
    if (i > arr.length - 1)
        return false;
    if (memo[i][target] != undefined)
        return memo[i][target];

    // try including/excluding ith element
    let include = subsetSum(arr, i+1, target - arr[i]);
    let exclude = subsetSum(arr, i+1, target);

    if (include) {
        memo[i][target] = true;
    } else if (exclude) {
        memo[i][target] = true;
    } else {
        memo[i][target] = false;
    }

    return memo[i][target];
}
```

