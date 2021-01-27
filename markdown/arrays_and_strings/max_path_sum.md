## Max path sum

### Problem

By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

```
   3
  7 4
 2 4 6
8 5 9 3

i.e., 3 + 7 + 4 + 9 = 23.
```

Given a pyramid with one-hundred rows, find the maximum path sum.

source: Maximum Path Sum II (project euler, problem 18/67) - https://projecteuler.net/problem=67

### Boardwork (Design)

![](../../images/xxx.jpg)

### Analysis

Time: O(n)
Space: O(n) - constant for in-place solution

### Codework (Test)

Javascript implementation.

```javascript
function maxPathSum(pyramid) {

    // copy input array (can re-use if ok to mutate in-place)
    const memo = [
        ...pyramid.map(arr => [...arr]), 
        Array(pyramid[pyramid.length - 1].length + 1).fill(0)
    ];

    // preprocess from bottom up
    [...Array(pyramid.length).keys()].reverse().forEach(n => {
        [...Array(pyramid[n].length).keys()].forEach(m => {
            memo[n][m] += Math.max(
                memo[n + 1][m],     // left
                memo[n + 1][m + 1]  // right
            )
        })
    })

    return memo[0][0];
}
```
(from [javascript/recursion_and_dynamic/max_path_sum.js](../../javascript/recursion_and_dynamic/max_path_sum.js))