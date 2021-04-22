# Searching

## Notes

**General**

* Ask if data dynamic, if so, consider using a heap or bst?
* Ask if there are many searches to perform, if so, consider preprocessing.
* If search uses sort, and sort takes the most time, reconsider sorting, ie if sort is the bottleneck, remove it!
* Must define comparison, if searching user-defined type. (EPI 144)
* When implementing bin search recursively, use two base cases: (1) target not found when l > r, and (2) target is found when a[m] == t, then recurse on (l, m-1) or (m+1, r).
* When implementing bin search iteratively, search while l<=r, and test for found condition inside loop.
* When implementing bin search, define midpt as L + (R - L) // 2 to prevent overflow.
* Find first occurance of k in sorted array using binary search, but when value is found, don't stop searching, eliminate values to right and keep going. - EPI 11.1 145
* Find "magic index" (ie., element == index) using binary search with target value replaced by index m at each step, ie., go left when a[m] > m, and go right when a[m] < m. - EPI 11.2 146
* Search a 2d-sorted matrix by alternating bin search on current col and row
* Search a cylindrical array for smallest value (ie., the seam) using bin search, discarding the half with no seam (first < last) until l == r (== smallest). - EPI 11.3 147
* Search intervals...
* Find closet value bigger/smaller than target using bin search the same way as if you were searching for first occurance, except if not found you still return left - 1 (floor) or left (ceiling) (eg. Pick index probabalistically based on weights)
* Pattern: Binary Search used in many ways by modifying the conditions for which you go left or right, and modifying whether you return closestest item to left/right if not found, and whether you are returning index or value.

**Javascript**

**Python**

* Use [bisect.bisect_left(arr,targ)](https://docs.python.org/2/library/bisect.html) rather than implementing own binary search.
* Also use **bisect_left** and **bisect_right** to find left/right insertion points into sorted array.

**C#**

---
## Search a sorted array (Binary Search)

Recursive Passing Indices

```js
function binSearch(arr, left, right, target) {

  let mid = left + Math.floor((right - left)/2);

  if (left > right)
    return -1; // if searching for closest to, return left (floor) or left + 1 (ceiling)
  if (arr[mid] === target)
    return mid; // if searching for first occ, return binSearch(left,mid) || mid

  if (arr[mid] < target) {                          // l----m--t--r -> go right
    return binSearch(arr, mid+1, right, target);
  } else {                                          // l-t--m-----r -> go left
    return binSearch(arr, left, mid, target);
  }
}
```

Iterative Passing Indices

```js
function binSearch(arr, left, right, target) {

  let [left, right] = [0, arr.length];

  while (left < right) { // pretty sure don't want left <= right. check this.
    let mid = left + Math.floor((right - left)/2);

    if (arr[mid] === target) {
      return mid; // if searching for first occ, set first = mid, and right = mid.
    } else if (arr[mid] < target) {   // l----m--t--r -> go right
      left = mid + 1;
    } else {                          // l-t--m-----r -> go left
      right = mid;
    }
  }

  return -1;
  return left - 1 (floor) or left (ceiling); // if searching for closest to
  return first; // if searching for first occur
}
```

**related:**
* climbing leader board - see [solution](./../../markdown/searching_and_sorting/climbing_leader_board.md)

---
## Search unsorted array (indexOf)

Can't do better than O(n) time complexity, BUT:
* if going to perform search many times, sort first for O(logn) look-up after initial search
* can optimize for small n by hashing values for constant time look-up at the cost of O(n) memory. If values map to array indices can hash with array.
* can optimizing for very large n, by placing a sentinal at end to obviate need for n loop termination condition checks

```js
function sentinalSearch(arr, target) {
  arr.push(target);                         // push sentinal (mutates array)
  let i = 0;
  while(arr[i] !== target) i++;             // while not found (we know it will be found)
  return (i < arr.length - 2) ? i : -1;     // if i == arr.length - 1, not found;
}
```

```js
function hashSearchFactory(arr) {

  let indexHash = new Map(); // Map optimized for repeated lookup

  arr.forEach((val, idx) => {
    if (indexHash.has(val)) {
      indexHash.get(val).push(idx);
    } else {
      indexHash.set(val, [idx]);
    }
  })

  return (target) => {
    return (indexHash[target] && indexHash[target][0]) || -1;
  }
}
let hashSearch = hashSearchFactory(arr);
let indexOfTarget = hashSearch(target)
```
---
## Search a 1d-sorted matrix (ie if flattened, the result would be a sorted array, eg. `[[1,2,3],[4,5,6],[7,8,9]]`)

```js
function matrixSearch(matrix, left, right, target) {

    let mid = getMiddleCellIdx(matrix, left, right);

    if (isNotFound(left, right)) {                  // left > right, not found.
        return -1;
    }
    if (getCellValueAt(matrix, mid) === target) {   // mid == target, found it.
        return mid;
    }

    if (getCellValueAt(matrix, mid) < target) {     // mid < target, go right.
        return matrixSearch(matrix, getNextCellIdx(matrix, mid), right, target);

    } else {                                        // mid > target, go left.
        return matrixSearch(matrix, left, getNextCellIdx(matrix, right), target);
    }
}
```
---
## search a 2d-sorted matrix (ie accending along rows and cols, ie min at upper left, max at lower right)

linear search + search space trimming - O(n+m) - this can be improved by doing bin search instead of stepping!! tbd.. but this is prob good starting point

```js
var searchMatrix = function(matrix, target) {
    let [row, col] = [0, matrix[0].length];

    while (row < matrix.length && col > -1) {

        if (matrix[row][col] === target) {
            return true
        } else if (matrix[row][col] < target) {
            row++; // todo: do a bin search here in col from row++ to last row
        } else {
            col--; // todo: do a bin search here in row from 0 to coll--
        }
    }
    return false;
};
```
---
## Search a cyclic array

search a cyclically-sorted array for min/max

```js
function findMinMax(arr, left, right) {

  let mid = left + Math.floor((right - left)/2);

  // mid is max: - - - mid/max | min - - -
  if (mid < arr.length -1 && arr[mid] > arr[mid + 1]) {
    return {min: mid + 1, max: mid}
  }

  // mid is min: - - - max | mid/min - - -
  if (mid > 0 && arr[mid] < arr[mid - 1]) {
    return {min: mid, max: mid - 1}
  }

  if (arr[mid + 1] > arr[right]) {
    findMinMax(arr, mid + 1, right);
  } else {
    findMinMax(arr, left, mid);
  }
}
```
---
## Find Magic Number in sorted array

asd

---
## Pick index probabalistically based on weights

```js
/**
 * @param {number[]} w
 */
function WeightedIndices(w) {
    this.sums = [];

    let runningSum = 0;
    for (weight of w) {
        runningSum += weight;
        this.sums.push(runningSum);
    }

    this.totalSum = runningSum;
};

WeightedIndices.prototype.pickIndex = function() {

  const _closetUpperBound = (arr, left, right, target) => {

    let mid = left + Math.floor((right - left)/2);

    if (left === right) {
      return right;
    }

    if (arr[mid] < target) {
      return _closetUpperBound(arr, mid + 1, right, target);
    } else {
      return _closetUpperBound(arr, left, mid, target);
    }
  }

  return _closetUpperBound(this.sums, 0, this.sums.length, Math.random() * this.totalSum);
};

let weightedIndices = new WeightedIndices([1,3,5,10])
let idx = weightedIndices.pickIndex()
```
(see https://leetcode.com/problems/random-pick-with-weight)

---
## Find Min/Max

if static, sort and return first/last
if dynamic prefer [Heap]() or [BST]()

---
## Find the k/kth largest

use [minHeap]() of size k

---
## Find Shortest Path in Directed Graph

Use BFT w/ a priority queue (ie Dykstra's). See [Graphs](.\markdown\trees_and_graphs\graphs.md)

---
## More problems

1. snapshot subarray - see [full implementation](.\..\..\javascript\searching_and_sorting\snapshot_array.js)
2. add interval = see [full imlpementation](.\..\..\javascript\searching_and_sorting\add_interval.js)
3. climbing leader board - see [solution](./../../markdown/searching_and_sorting/climbing_leader_board.md)
