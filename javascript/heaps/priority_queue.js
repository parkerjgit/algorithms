function PriorityQueue(
  compareFuction = (a, b) => a > b, 
  maxHeap = Number.MAX_SAFE_INTEGER
) {
  this.content = [];
  this.compareFuction = compareFuction;
  this.maxHeap = maxHeap;
}

PriorityQueue.prototype = {
  _leftChildId: (i) => (2 * i) + 1,
  _rightChiledId: (i) => (2 * i) + 2,
  _parentId: (i) => Math.floor((i - 1) / 2),
  _swap(a, b) {
      let temp = this.content[a];
      this.content[a] = this.content[b];
      this.content[b] = temp;
  },
  _float(i) {
      let pi = this._parentId(i)
      if (i > 0 && this.compareFuction(this.content[pi], this.content[i])) {
          this._swap(i, pi);
          this._float(pi);
      }
  },
  _sink(i) {
      let li = this._leftChildId(i);
      let ri = this._rightChiledId(i);
      if (li < this.content.length && this.compareFuction(this.content[i], this.content[li])) {
          this._swap(i, li);
          this._sink(li);
          this._sink(i);
      } else if (ri < this.content.length && this.compareFuction(this.content[i], this.content[ri])) {
          this._swap(i, ri);
          this._sink(ri);
          this._sink(i);
      }
  },
  push(item) {
      this.content.push(item);
      this._float(this.content.length - 1);

      // pop if max heap exceeded.
      if (this.content.length > this.maxHeap) {
          return this.pop();
      }
  },
  pop() {
      let temp = this.content[0];
      let lastItem = this.content.pop();
      if (this.content.length) {
          this.content[0] = lastItem;
          this._sink(0);
      }
      return temp;
  },
  peek() {
      return this.content[0];
  },
  size() {
      return this.content.length;
  }
}