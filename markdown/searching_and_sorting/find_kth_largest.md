## Find kth largest elements in an array

### Problem

Design an algroithm for computing the kth largest element in a n array. 
Assume entries are distinct.

source: EPI 11.8

### Boardwork (Design)

![](../../images/findkthlargest-2.jpg)

### Analysis

Time: O(n)
Space: O(1)

### Codework (Test)

Javascript implementation of in-place solution.

```javascript
function kthLargest(arr, k) {

    const isFound = pivot => pivot == arr.length - k;
    const isRight = pivot => pivot <  arr.length - k;

    let [left, right, pivot] = [0, arr.length -1, -1];

    while ( !isFound(pivot) && left < right ) {

        if( isRight(pivot) ) {
            left = pivot + 1;
        } else {
            right = pivot - 1;
        }
        
        // generate random pivot (index) btw left and right, then
        // partition array around it and return the pivot (index)
        pivot = partition(arr, left, right, randomInt(left, right));
    }

    return isFound(pivot) ? arr[pivot] : undefined;
}

// partitions array between left and right indices in-place around a random element
function partition(arr, left, right, pivot) {

    // 1. put pivot value to right
    swap(arr, pivot, right);
    pivot = right;

    // 2. partition the rest into less than and greater than pivot
    let [i,j] = [left - 1, left];
    while (j < pivot) {
        if(arr[j] < arr[pivot]) {
            swap(arr, j, i+1);
            i++;
            j++;
        } else { 
            j++;
        }
    }

    // 3. swap pivot value into place
    swap(arr, pivot, i+1);
    pivot = i+1;

    return pivot;
}
```
(from [find_kth_largest.js](../../javascript/searching_and_sorting/find_kth_largest.js))


