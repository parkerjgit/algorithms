# Backtracking

* Backtracking is an optimization for recursion, similar in ways to top-down dp (ie memoization) but instead of preventing overlapping subproblems, backtracking prunes decision tree.
* Two important characteristics:
* typically related to passing state down dft stack, mutating then reseting state before function returns. This is how backtrackingt optimizes for space.
* typically have some bounding function that allows you to prune decision space by stoping recursion under some condition (that is trivially checked or determined with bounding fn). This is how backtracking optimizes for time. THIS IS KEY to knowing when to use backtracking, ie when you are given some condition that can be used prune decision space, eg. deadend, over target value, false invariant, etc. This can be thought of as a base case, but often makes sense to check before recursing rather than after (base case).
* DP won't nec prune tree
* Backtracking won't nec prevent overlapping subproblems.

## Template

```js
function dft(state) {

  // bound here
  if (bounding(state)) {
    return;
  }

  // or here
  if (bounding(state)) {
    mutate(state);
    dft(state);
    reset(state);
  }

}
```

## Score Combinations

```js
function scoreCombinations(target, candidates) {

    let results = [], count = 0;

    function combinationSum(target, idx, cur = []) {

      // bounding function
      if (target < 0) {
        return;
      }

      if (target == 0) {
        results.push([...cur]);
        count++;
      }

      for (let i = idx; i < candidates.length; i++) {
        cur.push(candidates[i]);
        combinationSum(target - candidates[i], i, cur);
        cur.pop();
      }
    }

    combinationSum(target, 0, []);
    return count;
  }
```

---
## Max unique subsequence of strings

```js
var maxLength = function(arr) {
  function _dft(i, set = new Set()) {
      if (i === arr.length) return 0;

      // try including i
      let include = -Infinity;
      if (uniq(set, arr[i])) { // bound
          union(set, arr[i]);
          include = _dft(i+1, set);
          diff(set, arr[i]);
      }

      // try excluding i
      let exclude = _dft(i+1, set);

      // take best
      return Math.max(exclude, include + arr[i].length)
  };

  return _dft(0);
};
```
see [write-up](./max_unique_subsequence_of_strings.md)

---
## n queens problem

```js
function nQueens(n) {

    let solutions = [];

    // bounding fn: check for *any* conflicts with queens on preceeding rows
    function _conflicts(queens, candidate) {
        return queens.some(queen => (
            ( queen.col === candidate.col ) ||
            ( Math.abs(candidate.col - queen.col) === (candidate.row - queen.row) )
        ))
    }

    // solve for remaining rows, row to n-1, given queens on preceeding rows.
    function _solve(queens, row) {
        if ( row === n ) { // found solution!
          solutions.push([...queens]);
          return;
        }

        // try queen at each position in this row
        for (let col of Array(n).keys()) {
          queens.push({row,col}); // mutate state
          if (!_conflicts(queens, {row, col})) { // bounding
              _solve(queens, row + 1);
          }
          queens.pop(); // reset
        }

        // try no queens in this row
        _solve(queens, row + 1);
    }

    _solve([], 0);
    return solutions;
}
```
(untested)
