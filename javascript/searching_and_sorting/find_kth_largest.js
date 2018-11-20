/*
Design an algroithm for computing the kth largest element in a n array.. Assume entries are distinct.

source: EPI 11.8
*/

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

// util for generating random integers, inclusive
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// util for in-place element swap
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// test
describe('randomParition', function() {
    beforeEach(function() {
        this.testArr = [9,3,2,5,4,7,6,8];
    })
    it('partitions array between left and right indices in-place around a random element', function() {
        expect(partition(this.testArr, 0, this.testArr.length-1, 6)).toEqual(4);
        expect(partition(this.testArr, 0, 3, 0)).toEqual(1);
        expect(partition(this.testArr, 2, 3, 3)).toEqual(2);
    })
})
describe('kthLargest', function() {
    beforeEach(function() {
        this.testArr = [9,3,2,5,4,7,6,8];
    })
    it('finds the kth largest element in an unsorted array of distinct integers', function() {
        expect(kthLargest(this.testArr, 1)).toEqual(9);
        expect(kthLargest(this.testArr, 2)).toEqual(8);
        expect(kthLargest(this.testArr, 3)).toEqual(7);
        expect(kthLargest(this.testArr, 4)).toEqual(6);
        expect(kthLargest(this.testArr, 6)).toEqual(4);
    })
})