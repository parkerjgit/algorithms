/*
Write a program which takes as input a very long sequence of numbers 
and prints the numbers in sorted order. Each number is at most k away 
from its correctly sorted position, ie array is k-sorted.

source: EPI 10.3
*/

// import MinHeap from './min_heap';

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


// min heap class
function MinHeap() {
    this.content = [];
}
MinHeap.prototype = {
    _leftChildId: (i) => (2 * i) + 1,
    _rightChiledId: (i) => (2 * i) + 2,
    _parentId: (i) => Math.floor((i - 1) / 2),
    _swap(a, b) {
        let temp = this.content[a];
        this.content[a]=this.content[b];
        this.content[b]=temp;
    },
    _float(i) {
        let pi = this._parentId(i)
        if (i > 0 && this.content[pi] > this.content[i]) {
            this._swap(i, pi);
            this._float(pi);
        }
    },
    _sink(i) {
        let li = this._leftChildId(i);
        let ri = this._rightChiledId(i);
        if (li < this.content.length && this.content[li] < this.content[i]) {
            this._swap(i, li);
            this._sink(li);
            this._sink(i);
        } else if (ri < this.content.length && this.content[ri] < this.content[i]) {
            this._swap(i, ri);
            this._sink(ri);
            this._sink(i);
        }
    },
    push(item) {
        this.content.push(item);
        this._float(this.content.length - 1);
    },
    pop() {
        let temp = this.content[0];
        let lastItem = this.content.pop();
        if (this.content.length){
            this.content[0] = lastItem;
            this._sink(0);
        }
        return temp;
    }
}

// test
describe('sortKSorted', function() {
    it('correctly sorts a k-sorted array', function() {
        expect(sortKSorted([3,-1,2,6,4,5,8],2)).toEqual([-1,2,3,4,5,6,8])
    })
});