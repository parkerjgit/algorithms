# Arrays

Arrays store *homogeneous* elements at *contiguous* locations. For an array of size n:

Timing for an array:

```
Accessing:      O(1)
Search:         O(n) for Sequential Search (If unsortted)
                O(log n) for Binary Search (If sorted)
Insertion:      O(n)
Deletion:       O(n)
```

When to use:

* We know the size/contents ahead of time, and plan on mostly assessing/searching at runtime.

Advantages:

* constant-time random access given the index.
* space efficiency - only data, no links, no end-of-record info b/c fixed in size.
* fast iteration - Physical continuity, ie contiguity, between successive data elements helps exploit the high-speed cache memory.

Disadvantages:

* cannot adjust size at runtime
* insertion/deletion slow when compared to linked list because all elements after inserted/deleted element have to be shifted over.

## Notes

1. *Use* for **fast iteration**. Physical contiguity on single slab of memory helps exploit the high-speed cache memory.
1. *Use* for **constant-time indexing**. Binary search also fast O(logn) *if* array is sorteddd.
1. *Use* for **space efficiency**. Only data, no links, no end-of-record info b/c fixed in size.
1. *Use* for efficient **dictionary implementation** (if keys map naturally to array indices).
1. *Consider* **dynamic array for run-time flexiblity**. Arrays are fixed in size at runtime so no append/insert/delete unless dynamically allocated.
1. Consider writing values back-to-front, or alternately, reversing the array, especially if you are removing elements or splicing (back-to-front allows you to pop from end instead of remove/shift from front).
2. Prefer overwriting and swaping to expensive insertions. (EPI 5.5)
3. Use **Parallel logic** for rows and columns??? (EPI 38)
4. Wrap (i.e. rotate) a list about kth element with `A[k:] + A[:k]` (py), `A.slice(k) + A.slice(0,k)` (js)
4. Flatten a 2d array (matrix) with a nested loop or equiv, e.g., `[x for row in matrix for x in row]` (py) (can also use `matrix.flat()`, `[].concat(...matrix)` or `matrix.reduce((acc, row) => acc.concat(row), [])` (js))
5. Flatten an deep/arbitrarily nested array with recursion, e.g., [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_concat_isarray_recursivity)
5. Process items in a 2D array with `[[f(x) for x in row] for row in M]` (py), `rows.forEach(row => row.forEach(x => f(x)))` (js)
6. Partition an array in-place by indexing the first element of each partition, steping thru unsortted elements, swaping elements into correct partition as you go. (e.g. [dutch flag problem](
 ../markdown/arrays_and_strings/dutch_flag.md), EPI 5.1)
7. Process a sliding window of elements in an array using [inclusive] left and [exclusive] right pointers and a `while (right < n)` loop.


7. Increment number encoded as an array of digits by stepping thru array in reverse order, incrementing digits and carrying the one until there is no carry. (EPI 5.2)
8. Multiply two numbers encoded as arrays of digits by implemented long multiplication with nested for loop over reversed arrays. (EPI 5.3)
9. Check if "advancement" game board is valid by keeping track of furthest position reached-so-far and checking if any earily positions can get you further (EPI 5.4)
10. Delete duplicates from a sorted array by overwriting elements using a  cursor to keep track of write index. (EPI 5.5)
11. Find maximum spread within an array by checking the spread between each element and the min-so-far (EPI 5.6 Buy and Sell Stock once)
12. Alternate values in an array by stepping through each element pair and alternate sorting high-low and low-high, i.e. `A[i:i+2] = sorted(A[i:i+2], reverse=i%2)` (EPI 5.8)
13. Enumerate primes (i.e., > 1) ***up to n*** by initializing a bool array of size n to `[False, False] + [True]*(n-1)`, then stepping thru numbers 2 to n. If number corresponds to True, its a prime, append to result array and set multiples to False, i.e. `for m in range(i,n+1,i): is_prime[m] = False` (EPI 5.9)
14. Apply a permutation (i.e. map elements to new indices) using `A'[P[i]] = A[i]` In-place solution is NOT straight forward (see EPI 5.10)
15. Restore permutated array (i.e. look-up mapped elements) using `A[i] = A'[P[i]]`, i.e. `[A[i] for i in P]` ??Can't be right
16. To check if all items in list are same equal, prefer `a.count(a[0]) == len(a)` over `len(set(a)) == 1` for better time/space efficiency.
17. Consider mimicing an array with a hash table (with keys for indices) when indices == values for many elements, eg., when computing a random subset, to reduce space complexity. (EPI 5.14)
18. its ok and useful (e.g. recursive solution to Scramblies Kata) to slice an array/string of size 1, it returns an empy array/string, e.g. `'a'[1:] == ''` and `['a'][1:] == []`
19. its ok to create an empty range by specifying a start value >= end value, eg., `for i in range(5,2): ...`
19. Use `min([a,b],key=len)` to get shortest of two (or more) arrays.
20. Use `[int(c) for c in str(n)]` or `map(int,str(n))` to convert number into an array of digits.

A **subsequence** of an array is an ordered subset of the array's elements having the same sequential ordering as the original array

## Flatten an array

Flatten an arbitrarily nested array, e.g.,

```
[[1,2,3], [4,5,6]]    -> [1,2,3,4,5,6]
[1, [2,3], [4,5,6]]   -> [1,2,3,4,5,6]
[[1, [2,3, [4,5,6]]]] -> [1,2,3,4,5,6]
[]                    -> []             // handles empty array
[1, 2, , 3, 4]        -> [1,2,3,4]      // fixes holes
```

Javascript implementation of in-place solution. E.g.

```js
// using forEach
const flatten = (arr) => {
  let res = [];
  arr.forEach( el => {
    if (Array.isArray(el)) {
      flatten(el);
    } else { // not an array
      res.push(el)
    }
  })
  return res;
}

// using reduce
const flatten = (arr) => {
  return arr.reduce((res, el) => {
    if (Array.isArray(el)) {
      return [...res, ...flatten(el)]; // alt: res.concat(flatten(el))
    } else {
      return [...res, el]; // alt: res.concat(el)
    }
  }, [])
}

// using ternary
const flatten = (arr) => reduce((res, el) => {
  return res.concat(Array.isArray(el) ? flatten(el) : el)
}, [])
```
(from [xxx](../../javascript/xxx))

## Partition an array (dutch flag problem)

Partition an unsortted array into three groups given two pivots, such that elements in partition 1 are < pivot 1, elements in parition 2 are >= to pivot 1 and < than pivot 3, and elements in partition 3 are >= pivot 2, e.g.:
```
                                       p          p
[2,1,9,5,4,6,8,7,3], [3,6] -> [2,1, | (3),5,4, | (6),8,7]
```
Javascript implementation
```js
function 3partition(arr, pivots) {

  // maintain pointer at first element of each partition
  // define partitions as (invariants):
  // first partition: [0: mid]
  // secon partition: [mid: last]
  // third partition: [last]
  let [mid, last] = [0,0],
      [p1, p2] = pivots;

  // helper
  const swap = (a,b) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  // loop thru each el in array:
  // if el in part 1 (el < p1) -> swap(l, r), swap(c, l), incr lrc
  // if el in part 2 (p1 <= el < p2), swap(c, r) -> incr r
  // if el in part 3 (el >= p2) -> incr rc
  arr.forEach((el,i) => {
    if (el < p1) { // partition 1
      swap(mid, last);
      swap(i, mid);
      l++; r++;
    } else if (p1 >= el && el < p1) { // partition 2
      swap(i, last);
      r++;
    } else { // partition 3
      // no nothing
    }
  })

}
```

## reverse array elements from i to j in-place

```js
const swap = (arr, a, b) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

const reverse = (arr, from, to = arr.length) => {
    let [left, right] = [from, to - 1];
    while (left < right) {
        swap(arr, left, right);
        left++;
        right--;
    }
}
```

see https://leetcode.com/problems/next-permutation/submissions/

## Apply/restore permutation of an array

## Is x a subsequence of y

```js
var isSubsequence = function(subseq, str) {
    let i = 0;
    for (let ch of str) {
        if (ch == subseq[i]) {
            if (i == subseq.length - 1) {
                return true;
            }
            i++;
        }
    }
    return false;
};
```

## Count Subsequences

```js
var numMatchingSubseq = function(s, words) {
  let count = 0;

  // maps char -> array index
  const hashfn = (ch) => ch.charCodeAt(0) - 'a'.charCodeAt(0);

  // group words by first letter, eg. [0: ['ab', 'abc'], 1: ['b', 'bag'], ...]
  let buckets = [...Array(26)].map(_ => new Array());
  for (let word of words) {
      buckets[hashfn(word[0])].push(word);
  }

  for (let ch of s) {
      let bucketCopy = [...buckets[hashfn(ch)]];

      // clear bucket
      buckets[hashfn(ch)] = [];

      // process words
      for (let word of bucketCopy) {
          if (word.length == 1) {
              // found one!
              count++;
          } else {
              // move rest of word to approp. bucket
              let [first, ...rest] = [word[1], word.slice(1)];
              buckets[hashfn(first)].push(rest)
          }
      }
  }

  return count;
};
```

## More Problems

1. Count number of matching subsequences in pool of candidates -  maintain bucket that maps char to chars remaining for each candidate. see [full implementation](javascript/arrays_and_strings/count_matching_subsequences.js)
