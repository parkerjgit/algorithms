## Sort an almost-sorted (k-sorted) array

### Problem

Write a program which takes as input a very long sequence of numbers 
and prints the numbers in sorted order. Each number is at most k away 
from its correctly sorted position, ie array is k-sorted.

source: EPI 10.3

### Boardwork (Design)

![](../../images/sortksorted-2.jpg)

### Analysis

Time: O(nlogk)
Space: O(k)

### Codework (Test)

Javascript implementation.

```javascript
function sortKSorted(arr, k) {
    let heap = new MinHeap();
    let result = [];

    // heapify first k items
    arr.slice(0,k+1).forEach(item => {
        heap.push(item);
    });

    // push-pop remaining n-k items
    arr.slice(k+1).forEach(item => {
        result.push(heap.pop());
        heap.push(item);
    });

    // pop remaining k items off the heap
    [...Array(k+1)].forEach(_ => {
        result.push(heap.pop());
    });

    return result;
}
```
(from [sort_k_sorted.js](../../javascript/heaps/sort_k_sorted.js))




