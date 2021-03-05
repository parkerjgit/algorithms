# Searching

**General**

* Ask if data dynamic, if so, consider using a heap or bst?
* Ask if there are many searches to perform, if so, consider preprocessing.
* If search uses sort, and sort takes the most time, reconsider sorting, ie if sort is the bottleneck, remove it!
* Must define comparison, if searching user-defined type. (EPI 144)
* When implementing bin search recursively, use two base cases: (1) target not found when l > r, and (2) target is found when a[m] == t, then recurse on (l, m-1) or (m+1, r). When implementing iteratively, search while l<=r, and test for found condition inside loop.
* When implementing bin search, midpt = L + (R - L) // 2 to prevent overflow.
* Find first occurance of k in sorted array using binary search, except when value is found, don't stop searching, eliminate values to right and keep going. - EPI 11.1 145
* Find "magic index" (ie., element == index) using binary search with target value replaced by index m at each step, ie., go left when a[m] > m, and go right when a[m] < m. - EPI 11.2 146
* Search a cylindrical array for smallest value (ie., the seam) using divide and conquer, discarding the half with no seam (first < last) until l == r (== smallest). - EPI 11.3 147
* Pattern: Binary Search used in many ways by modifying the conditions for which you go left or right.

**Javascript**

**Python**

* Use [bisect.bisect_left(arr,targ)](https://docs.python.org/2/library/bisect.html) rather than implementing own binary search.
* Also use **bisect_left** and **bisect_right** to find left/right insertion points into sorted array.

**C#**

## Search a sorted array (Binary Search)

Recursive Passing Indices

```js
function binSearch(arr, left, right, target) {

  let mid = left + Math.floor((right - left)/2);

  if (left > right) 
    return -1;
  if (arr[mid] === target)
    return mid;

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
  
  while (left <= right) {
    let mid = left + Math.floor((right - left)/2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {   // l----m--t--r -> go right
      left = mid + 1;
    } else {                          // l-t--m-----r -> go left 
      right = mid;
    }
  }

  return -1;
}
```

## Search unsorted array (indexOf)

Can't do better than O(n) time complexity, BUT:
* if going to perform search many times, sort first for O(logn) look-up after initial search
* can optimize for very small n by hashing values for constant time look-up at the cost of O(n) memory. If values map to array indices can hash with array.
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

## Seach 1d-sorted matrix (ie if flattened, the result would be a sorted array, eg. `[[1,2,3],[4,5,6],[7,8,9]]`)

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

## Find Magic Number in sorted array

## Find Min/Max

## Find the kth largest 

