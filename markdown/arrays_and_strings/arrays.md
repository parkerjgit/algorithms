# Arrays

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
function partitionIntoThree(arr, pivots) {

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
    arr[b] = temp;l
  }

  // loop thru each el in array:
  // if el in part 1 (el < p1) -> swap(l, r), swap(c, l), incr lrc
  // if el in part 2 (p1 <= el < p2), swap(c, r) -> incr r
  // if el in part 3 (el >= p2) -> incr rc
  arr.forEach(el => {
    if (el < p1) { // partition 1
      swap(mid, last);
      swap(el, mid);
      l++; r++;
    } else if (p1 >= el && el < p1) { // partition 2
      swap(el, last);
      r++;
    } else { // partition 3
      // no nothing
    }
  })

}
```

## Apply/restore permutation of an array


