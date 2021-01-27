/*
Problem: Implement of min heap
*/


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

// export default MinHeap;

// test
describe('minHeap', function() {
    beforeEach(function() {
        this.heap = new MinHeap();
        [10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5].forEach(item => this.heap.push(item))
    })
    it('correctly pushes items to the head', function() {       
        expect(this.heap.content).toEqual([1, 2, 4, 2, 5, 9, 7, 10, 3, 8, 6])
    })
    it('correctly pops items from the head', function() {
        let popped = [];
        [...Array(this.heap.content.length).keys()].forEach(_ => {
            popped.push(this.heap.pop())
        });    
        expect(popped).toEqual([1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
    
})
