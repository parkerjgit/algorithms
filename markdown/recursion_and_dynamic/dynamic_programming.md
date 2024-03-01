# Dynamic Programming

## Notes

* Consider DP when you need to make a series of decisions. Instead of making a logical decision, make all decisions and take the best result, e.g. finding levenstein distance (EPI 16.2 241)
* Logic most useful in **pruning the decision space**, particularily for recursive solutions, e.g., number of ways through a graph (EPI 16.3 244, Project Euler 15)
* Consider DP for counting/combinatorial problems, e.g. count number of ways through a graph (EPI 16.3 244, Project Euler 15), number of ways to run up stairs, i.e., triple step (CTCI 342)
* DP conceptually recursive but often more efficient to pre-build up whole cache bottom-up iteratively before making lookup, e.g., number of ways through a graph (EPI 16.3 244, Project Euler 15)
* Iterative solution typically more efficient, but not when recursive solution finds solution early or does a better job of pruning subproblems.
* Recursive approach typically caches with hash table or BST, iterative solutions usually use one- or multi-dimensional arrays for exhaustive caching.
* Memoization and tabulation may be further optimized by recycling cache as you go, i.e., after you know there will be no more lookups, e.g. fibanacci (EPI 336). When tabulating data, always consider how much history you need to calculate each data point (often you only need previous data point, so recycle! )
* Be sure there are only a polynomial number of different subproblems that you are caching, e.g., if there are only two integer arguments that range
between 1 and n, then there can be at most n^2 different recursive calls!
* Memoizing multiple args in python, use tuple. javascript, use nested array if args are positive integers, or use stringfied array as key. May be tempting to use Maps with arrays as keys but using mutable objects as keys will lookup the reference not the value, which will not work. Need to create hash from the value and easiest way to do that is stringify it.

---
## Warm-up

1. Find nth number in fibonacci sequence.

---
## Count Square/Rectangular Submatrices with all ones

see [Matrices](./markdown/matrices/matrices.md)

---
## Pair up items from two groups such that cost (ie sum of weights) is minimum (campus bikes II)

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
(see [full write-up](./../recursion_and_dynamic/campus_bikes_2.md))

---
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

**related:**
1. [number of ways to decode](./../../markdown/recursion_and_dynamic/num_ways_to_decode.js)

---
## Min cost (or max value, etc.) of combining exaustible items with variable cost & value (0/1 knapsack problem):

```js
var Knapsack = function(items, capacity) {

  // dp [cap][i] -> max value for cap remaining, from i (including or excluding ith item)
  let memo = [...Array(capacity + 1)].map(_ => [...Array(items.length)])

  const getCost = (item) => {...}
  const getValue = (item) => {...}

  const _maxVal = (candidates, capacity, i) => { // here m/n repr. 0's/1's *capacityRemaining*!!

      if (i > candidates.length - 1)
          return 0;
      if (capacity <= 0)
          return 0;
      if (dp[capacity] && typeof dp[capacity][i] !== 'undefined')
          return dp[capacity][i];

      // 1. get the value & cost of inclusion
      let cost = getCost(candidates[i]);
      let value = getValue(candidates[i]);

      // 2. get max value for include/exclude case
      let include = value + _maxVal(capacity - cost, i+1),
          exclude = _maxVal(capacity, i+1);

      // 3. try including it and excluding it if can afford it, else exclude it.
      if (cost > capacity) {
          dp[capacity][i] = exclude;
      } else {
          dp[capacity][i] = Math.max(include, exclude); // take max value
      }

      return dp[capacity][i];
  };

  return _maxVal(items, capacity, 0);
};
```

---
## Min cost (or max value, etc.) of combining exaustible items with variable cost & constant value (ones and zeros problem):

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
(see [full implementation](./../../javascript/recursion_and_dynamic/ones_and_zeros.js))

---
## Min cost (or max value, etc.) of combining inexaustible items (ie. magic knapsack problem, eg. coin change problem w/ inexaustible denominations):

```js
const dp = [...Array(remaining)].map(r=>Array(denominations.length));
function minChange(remaining, denominations, i) {

    if (remaining < 0)
        return Infinity;
    if (remaining % denominations[i] == 0)
        return remaining / denominations[i];
    if (dp[remaining] && typeof dp[remaining][i] !== 'undefined')
        return dp[remaining][i];

    let include = 1 + minChange(remaining - denominations[i], denominations, i),
        exclude = minChange(remaining, denominations, i+1);

    if (include < Infinity && exclude < Infinity) {
        dp[remaining][i] = Math.min(include, exclude);
    } else {
        dp[remaining][i] = include || exclude || Infinity;
    }

    return dp[remaining][i];
}
```
(untested)

---
## Find subset that sums to target, ie combination of exaustible items that sum to target (eg. coin change problem w/ exaustible coins)

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

---
## Levenstein Distance

tbd...

---
## Minimax

1. eg. Geuss number higher or lower II - https://leetcode.com/problems/guess-number-higher-or-lower-ii

minimaxm with top-down memo

```js
var getMoneyAmount = function (n) {

  const dp = Array(n + 1).fill(null).map(() => Array(n + 1).fill(Infinity))

  const minimax = (l, r) => {
    if (l >= r) return 0
    if (dp[l][r] !== Infinity) return dp[l][r]

    let min = Infinity;
    for (let cur = l; cur <= r; i++) {
      min = Math.min(
          min,
          cur + Math.max(minimax(cur + 1, r), minimax(l, cur - 1))
      )
    }
    dp[l][r] = min;
    return dp[l][r]
  }

  return minimax(1, n)
};
```

bottom-up dp

see https://leetcode.com/problems/guess-number-higher-or-lower-ii/discuss/84769/Two-Python-solutions

see how this problem relates to zero/ones problem!!!

---
## Validate: Is it possible to break a string into substrings that are all in a dictionary

**Top-down:**

```js
var wordBreak = function(s, wordDict) {
  const dict = new Set(wordDict)
  const memo = new Map();
  return canBreak(s, dict, memo);
};

function canBreak(s, dict, memo) {
  if (dict.has(s)) return true;
  if (memo.has(s)) return memo.get(s);

  for (let i = 1; i < s.length; i++) {
      if (dict.has(s.slice(0, i)) && canBreak(s.slice(i), dict, memo)) {
          memo.set(s, true);
          return true;
      }
  }
  memo.set(s, false);
  return false;
}
```
**Bottom-up:**

```js
const wordBreak = (s, wordDict) => {
  const dict = new Set(wordDict)
  const dp = Array(s.length + 1).fill(false);

  dp[0] = true;
  for (let right = 1; right <= s.length; right++) {
      for (let left = 0; left < right; left++) {
          if (dp[left] && dict.has(s.slice(left, right))) {
              dp[right] = true;
              break;
          }
      }
  }
  return dp[s.length];
};
```

---
## More Problems:

1. [number of ways to decode](./../../markdown/recursion_and_dynamic/num_ways_to_decode.js)
