# Recursion

* good choice for 
  * traversing irregular structures, jagged arrays/graphs
  * divide and conquer, e.g. merge sort
  * enumeration, e.g. generate powerset
  * binary searches, e.g. find an index such that A[i] = i (ie., the magic index)
* consider if find yourself writing nested iteration loops, eg??
* immutable/recursive solution often more simple/intuitive, while iterative/in-place solution is more performant.
* consider the following optimizations:
  * replacing base case with while loop
  * replacing call stack with an actual stack
  * performing alot of slicing -> pass indices down and switch to in-place solution
  * discover random overlapping subproblems, or recursion is strictly top-down -> memoization
  * building solution up from bottom -> dynamic programming / tabulation
  * want to optimize execution time at the cost of additional preprocessing time -> dynamic programming / tabulation

## Flatten a jagged array

```js
const flatten = (arr) => {
  return arr.reduce((res, el) => {
    return Array.isArray(el)
      ? res.concat(flatten(el))
      : res.concat(el)
  },[])
}
```

## Traverse and arbitrary tree/graph

```js
// tree
const dft = (node) => {
  if (node) {
    process(node);
    dft(node.left);
    dft(node.right);
  }
}

// equiv to:
const dft = (node) => {
  let stack = [node];
  while (stack.length) {
    let cur = stack.pop();
    process(cur);
    stack.push(node.left);
    stack.push(node.right);
  }
}

// graph nodes
const dft = (node) => {
  if (node) {
    process(node);
    for (child of node.children) {
      dft(child);
    }
  }
}

// equiv to:
const dft = (node) => {
  let stack = [node];
  while (stack.length) {
    let cur = stack.pop();
    for (child of node.children) {
      stack.push(child);
    }
  }
}

// graph - adjacency map
const dft = (adjMap, nid) => {
  // do smth w/ data[nid]
  for (let adj of adjMap[nid]) {
    dft(adjMap, adj);
  }
}

// equiv to
const dft = (adjMap, nid) => {
  let stack = [nid];
  while (stack.length) {
    let cur = stack.pop();
    for (let adj of adjMap[nid]) {
      stack.push(adj)
    }
  }
}

// matrix (undirected)
const dft = (matrix, row, col) => {
  for (let [r,c] of unvisitedNeighbors(row, col)) {
    dft(matrix, r, c)
  }
}

const def = (matrix, row, col) => {
  let stack = [hash(row,col)];
  while (stack.length) {
    let cur = revHash(stack.pop());
    for (let nei of unvisitedNeighbors(...cur)) {
      stack.push(hash(...nei));
    }
  }
}
```



## Implement merge sort

1. divide into equal halves
2. sort each half 
3. merge them together

**Javascript (in-place)**

```js
var mergeSort = function(arr) {

  function _merge(arr, left, mid, right) {...}

  function _sort(arr, left, right) {

      if (left < right) {

        // 1. divide in half
        let mid = left + Math.floor((right - left) / 2);
        
        // 2. sort each half (in-place)
        _sort(arr, left, mid);
        _sort(arr, mid + 1, right);

        // 3. merge sorted halves (in-place)
        _merge(arr, left, mid, right);
      }
  }

_sort(arr, 0, arr.length - 1);
}
```

## Find the magic value

1. For a sorted distinct-valued array, the following conditions must be met for magic index to exist:
    a. the lowest value must be less than or equal to the lowest index.
    b. the highest value must be greater than or equal to the highest index.
2. If those conditions are met AND there is only one value, then it must be the magic index. Otherwise, recurse
on left or right half of array if middle value is not magic.

```js
function _find(arr, lo, hi) {
	
  // base cases
  if (arr[lo] > lo) {
    return -1;
  }
  if (arr[hi] < hi) {
    return -1;
  }
  if (lo === hi) {
    return lo;
  }

  // must be more than 1 item, so find middle
  mid = lo + Math.floor((hi - lo) / 2);

  // recurse left or right if not mid
  if (arr[mid] === mid) {
    return mid
  } else if (arr[mid] > mid) {
    return _find(arr, lo, mid-1)
  } else {
    return _find(arr, mid+1, hi)
  }

}
```

## Generate the powerset

1. powerset of a set of elements is recursively defined as the **union of two sets:**
  a. **exclusion set** := powerset of all elements *excluding* the first
  b. **inclusion set** := set created by *including* the first element in every set of exclusion set

```js
const powerset = ([first, ...rest]) => {
  if(!first)
    return [[]]

  let exclude = powerset(rest);
  let include = exclude.map(s => [...s, first]);

  return [
    ...exclude,
    ...include
  ]
}
```

## demonstrate bottom-up and top-down recursion