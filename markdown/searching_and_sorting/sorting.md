# Sorting

1. Sort to preprocess collection to make searching faster.
2. Sort to identify like items, eg. ...
3. Naive Sorting algorithms run in O(n<sup>2</sup>), e.g., bubble sort, selection sort, insertion sort.
4. Fast Sorting algorithms run in O(nlogn), e.g., heapsort, merge-sort, and quicksort (quicksort is usually the best choice even though it degrades to exponential in worst case!)
3. For some inputs, its possible to beat O(nlogn) with custom sorting routine, e.g., using min-heap to sort items known to be at most k places from final location in O(nlogk).
4. For some inputs, its possibe to sort in O(n), e.g., for a small number of values or small range of values, e.g., sort people by age using counting sort
4. For very small number of values (< 10), insertion sort is easier to code and faster than asymptocally superior algorithms!

**Javascript**

**Python**

5. [python] Sort a list in-place with sort() *method*. (see python_sorting.md)
6. [python] Get a new sorted list from an iterable using the sorted() *function*. (see python_sorting.md)
7. [python] Sort non-comparable objects by passing a function to keyword argument "key", that maps complex objects (classes, tuples, etc.) to objects that *are* comparable (integers, strings, etc.). (see python_sorting.md)
8. [python] Sort class objects implicitly by implementing a compare dunder method `__lt__`


9. Find intersection of two sorted arrays by indexing start of both arrays and testing indexed elements for equality. If equal, append to result and advance both, otherwise advance smaller. Do until one or both arrays are exhausted. (see EPI 13.1 182) 
10. Merge two sorted arrays (if one has enough empty spaces at end to hold the other) by filling buffered array back to front with merged elements starting at m + n + 1, where m and n are the number of elements in first and second array. (see EPI 13.2 183, CTCI 396)

## Bubble Sort

Bubble sort works by stepping through n-1 elements of an array and for each step, comparing the element at i with element at i+1, and swapping if nec. In this way, the largest element of each pass bubbles to the end of array (for increasing order).

```js
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) { // Last i elements are already in place
    if (arr[j] > arr[j + 1]) {
      swap(j, j + 1);
    }
  }
}
```

Bubble sort has quadradic O(n<sup>2</sup>) runtime, but is an in-place sorting algorithm, so constant O(1) auxilary space.

## Selection Sort

The selection sort algorithm sorts an array A, by stepping through n - 1 elements of the n-element array, and for each element A[i], finds the minimum element to the right, i.e. in the n - i unsortted elements, and swaps it with A[i]. 

```
  i j ->
| * * * * * * * * * * * |
      i j -> (find min and put at end of sorted)
| 0 | * * * * * * * * * |
            i j ->
| 0 1 3 4 | * * * * * * |
```

```py
for i in range(len(A)):
     
    min_id = i
    for j in range(i+1, len(A)): # find smallest to right
        if  A[j] < A[min_id]:
            min_id = j
                    
    A[i], A[min_id] = A[min_id], A[i] # swap with 
```

So for an n element array we have an upper bound on run time of
    **n(n - i - 1) -> n<sup>2</sup> - ni - n**
After removing non-dominant terms in sum, we have:
    **n<sup>2</sup>**
So, selection sort has a quadradic upper bound on runtime, or:
    **O(n<sup>2</sup>)**

## Insertion Sort (playing cards)

Insertion sort steps through n - 1 elements of n-element array, removes each element and finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain. **This is typically how we sort playing cards.** Insertion sort has quadradic runtime but is more efficient in practice than most other simple quadratic algorithms such as selection sort or bubble sort. (wikipedia)

```
  j 
| * * * * * * * * * * * |
   <- j (take next and find its place in sorted)
| 0 | * * * * * * * * * |
         <- j 
| 0 1 3 4 | * * * * * * |
```

```py
def insertionSort(A):
    for i in range(1, len(A)):
        j = i
        while j > 0 and A[j-1] > A[j] :
            A[j],A[j-1] = A[j-1],A[j]
            j -= 1
```

This can be improved using temp var, x, to hold current element, so not performing so many swaps in the inner loop:

```py
def insertionSort(A):
    for i in range(1, len(A)):
        cur = A[i]
        j = i-1
        while j >= 0 and cur < A[j] :
            A[j+1] = A[j]
            j -= 1
        A[j+1] = cur
```

For an n element array we have upper bound on runtime of:
    **n(n-i) = n<sup>2</sup> - ni**
Removing non-dominant terms in sum:
    **n<sup>2</sup>**
So, we have [worst cast] quadradic runtime, or:
    **O(n<sup>2</sup>)**
We store at most 1 element at time, so we have constant auxiliary space complexity:
    **O(1)**

## Merge Sort

Merge sort, like Quick sort, is classic example of **divide and conquer** algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves in sorted order:

1. divide into halves
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

reference:
http://www.geeksforgeeks.org/merge-sort/
http://algs4.cs.princeton.edu/22mergesort/

## Quick Sort

Like Merge Sort, QuickSort is a **Divide and Conquer** algorithm. It picks an element as pivot (typ last element) and partitions the given array, such that the pivot is at its correct position (in the tobe sorted array), and all smaller elements are before it, and all greater elements are after it. It then calls itself recursively on subarrays to left and right of pivot.

```py
def partition(arr, l, r):
    pid = r
    i = l
    for j in range(l,r):
        if arr[j] <= arr[pid]:
            arr[j],arr[i] = arr[i],arr[j]
            i += 1
    arr[pid],arr[i] = arr[i],arr[pid]
    return i

def sort(arr,l,r):   
    if(l<r):
        pid = partition(arr, l, r)
        sort(arr, l, pid-1)
        sort(arr, pid+1, r)
        
def quicksort(arr):
    sort(arr, 0, len(arr)-1)
    return arr

test = [21, 4, 1, 3, 9, 20, 25, 6, 21, 14]
print quicksort(test)
```

Quicksort like merge sort has superlinear nlog(n) runtime (provided the split point is near the middle) *and* without the need for additional memory as with merge sort. As a trade off though it has a worst case quadradic runtime, where as merge sort can guarantee nlog(n) runtime. This is because in the worst case, the split points are not in the middle, but on the ends, leaving a very uneven division. In this case, we are not halving the list so much as we are stepping through it. The result is an O(n2) sort *plus* all of the overhead that recursion requires. 

reference:
http://algs4.cs.princeton.edu/23quicksort/
http://www.geeksforgeeks.org/quick-sort/

## Counting Sort (integer sorting when value range is rel. small, ie < array size)

**sort ages of people over 50**

```js
// ages = [51,65,52,95,...]

let hashFn = (age) => age - 50; // generate hash id by age, eg. f(50) -> 0
let revHash = (hashId) => hashId + 50;  // recover age from hash id, eg f(0) -> 50

// let ageCounts = smallIntCounter(ages, hashFn);
let ageCounts = Array(100-50).fill(0); // hashId -> count; revHash(hashId) = age; hash(age) = hashId

// 1. count ages
ages.forEach((age, idx) => ageCounts[hashFn(age)]++); // [0, 3, 2, ...]

// 2. rebuild (or overwrite for in-place)
let sorted = [];
for (let hashId = 0; hashId < ageCounts.length; hashId++) {
  let age = revHash(hashId);
  for (let i = 0; i < age; i++) {
    sorted.push(age);
  }
}
```

**sort people by age**

```js
/* 
  // map pid -> person
  people = [
    0: {name: 'joe', age: 61},
    1: {name: 'jane', age: 52},
    2: {name: 'jill', age: 52},
    ...
  ]

  // map hashid (from age) -> array of people indices
  hash: {
    2: [1, 2]
  }
*/

const hashTable = Array(100-50).fill(null); 
const hashFn = (person) => person.age - 50; 

// 1. hash people: hashFn(person) -> array<pid> - corresponding to people in this age group
people.forEach((person, pid) => {
  let hashId = hashFn(person);
  if (hashTable[hashId]) {
    hashTable[hashId].push(pid);
  } else {
    hashTable[hashId] = [pid];
  }
})

// 2. traverse hash, and rebuild in sorted order.
let results = hashTable
  .filter(hashValue => hashValue) // hashValue !== null
  .flatMap(pid => people[pid])
```

using object

NOTE: 
* have to use Map to traverse in order!!! 
* have to initialize because in-order traversal is insertionorder!!!

```js
let hashMap = new Map([...Array(50).keys()].map(key => [key, []])); 
let hashFn = (person) => person.age - 50;

// 1. hash people: hashFn(person): hashId -> pids of people in this age group
people.forEach((person, pid) => {
  let hashId = hashFn(person);
  hashMap.get(hashId).push(pid);
})

// 2. traverse hash, and rebuild in sorted order.
let results = hashMap.values().flatMap(pid => people[pid])

// equiv to:
// let results = [];
// hasMap.values().forEach(pidsInAgeGroup => {
//   let peopleInAgeGroup = pidsInAgeGroup.map(pid => people[pid]);
//   result.push(...peopleInAgeGroup);
// })


```

## Sort small range of numbers (eg Sort Colors, aka Dutch Flag)

Note, this can be solved in single pass by partitioning with multiple pointers (see dutch flag problem)

```js
var sortColors = function(nums) {
    
    let counts = [0,0,0];
    
    // 1. count colors
    nums.forEach(color => counts[color]++);
    
    // 2. overwrite nums 
    let i = 0;
    while (i < nums.length) {
        let color;
        
        if (counts[0] > 0 ) {
            color = 0;
        } else if (counts[1] > 0 ) {
            color = 1;
        } else {
            color = 2;
        }
        
        nums[i] = color;
        counts[color]--; // this is not nec (see https://leetcode.com/problems/sort-colors/discuss/683155/JavaScript-O(n)-1-pass-and-2-pass)
        i++;
    }
    
};
```
(from https://leetcode.com/problems/sort-colors)

## Bucket Sort (part of radix sort) 

Bucket sort is a distribution sort. Bucket sort can be seen as a generalization of counting sort; in fact, if each bucket has size 1 then bucket sort degenerates to counting sort. Bucket sort with two buckets is effectively a version of quicksort where the pivot value is always selected to be the middle value of the value range.

## create immutable sort and put on Array.prototype

```js
[...arr.sort()]
```

## Sort an objects by props

```js
let objs = [{a:1, b:2}]

objs.sort((a,b) => a[a] - b[a])
```

## Sort one array by another array

```js
// arrToSort, arrToSortBy

arrToSort
  .map((item, i) => {item, sortBy: sortBy[i]})
  .sort((a, b) => a[sortBy] - b[sortBy])
  .map((obj) => obj[item])
```

## Group people by age (counting sort)
