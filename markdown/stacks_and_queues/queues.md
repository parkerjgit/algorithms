# Queues

## Notes

* Stacks and Queues and great when its ok to black box the data (i.e., no search or arbitrary access)
* First In First Out (FIFO) are the "Fairest". Trickier to implement than stacks so use when order matters, or when want to minimize max time any item spends in the container, or when FIFO ordering is required as it is for *Breadth First Search*. Use *Enqueue* and *Dequeue* to insert/remove items into/from back/front of queue.
* Queues typically implemented using either arrays or linked lists. If upper bound on the size of the container is known in advance, use a static array, else use a linked list (or dynamic array).
* If implementing with array, use the end of array for the operation (i.e., enqueue or dequeue) you want to optimize for!
* a deque is a double-ended queue (or stack i guess), implemented as doubly linked-list or as a dynamic array. javascript/python arrays implement deques b/c you can push/pop both sides.
* enqueue/dequeue operations on front of deque are often called push/pop and enqueue/dequeue on back go by many names like inject/eject, etc.
* Use queue for buffering messages/moves/etc., processing data stream, eg. stream avg problem

---
## Warm-up

1. implement a quick and dirty queue. enqueue/dequeue some items.

---
## Python Implementing queue with Array

Implemenation of a queue using an array in python is trivial b/c array has builtin enQueue(insert)/deQueue(pop) functions:

```py
class Queue:
    def __init__(self):
        self.items = []

    def isEmpty(self):
        return self.items == []

    def enqueue(self, item):
        self.items.insert(0, item)

    def dequeue(self):
        if (self.isEmpty()):
            return float("-inf")
        return self.items.pop()

queue = Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.dequeue()
```

*Note*, possible to implement queue with array so that either end is the head. So, instead of using `insert(0)` to enqueue start and `pop()` to dequeue last element, could use `append()` to enqueue end and `pop(0)` to dequeue first element. `append()` and `pop()` are faster so if want fast dequeue pop off the end of the array. Of course, if order doesn't matter, we should be using a stack, so we can `pop()` AND `append()` off the end of the array in constant time.

---
## Javascript: Implementing queue with Array (using closure, object delegation, protypes, and classes)

```js
// quick and dirty
let q = [];

// Constructor function (creates full copy of base object)
function Queue() {
    return {
        items: [],
        enqueue(val) {
          return this.items.unshift(val)
        },
        dequeue() {
          return this.items.pop()
        }
    }
}
let q = new Queue();

// behavior delegation (creates copy of items array when initialized, but delegates all function calls to base object via prototype chain)
let queue = {
  init() {
    this.items = [];
  },
  enqueue(item) {
    return this.items.unshift(item);
  },
  dequeue() {
    return this.items.pop() ;
  }
}
let q = Object.create(queue); // 1. creates empty object with queue prototype
q.init();                     // 2. creates items array on object

// Setting prototype explicitly. Affect is the same as behavioral delegation if no inheritance further up chain.
function Queue() {
  this.items = [];
}
Queue.prototype = {
  enqueue(item) {
    return this.items.unshift(item);
  },
  dequeue() {
    return this.items.pop() ;
  }
}
let q = new Queue()

// classes
class Queue {
  constructor() {
    this.items = []
  }
  enqueue(item) {
    return this.items.unshift(item);
  }
  dequeue() {
    return this.items.pop() ;
  }
}
let q = new Queue()
```

**notes:**

* design considerations:
  * how you want to handle dequeue on empty queue?
  * do you want to optimize for dequeue or enqueue?
  * what is max size of queue? what happens if enqueue a full queue?

### Implementing queue with doubly-linked list

We can acheive constant-time enqueue/dequeue using a linked list, but that comes with some added overhead.

---
## Implement queue with stacks

1. maintain two stacks: enq and deq
2. enqueue: push onto enq stack.
3. dequeue: pop off of deq stack. If empty, then pour (ie. push/pop) contents of enq into deq, then pop deq

---
## implement constant-time max API

1. in addition to the queue, maintain a max "deck" (ie. double-ended queue)
2. on equeue: eject items from back of deck that are less than new item. Then enqueue max.
3. on dequeue: also dequeue max iff the item at front of max (next in line) is equal to dequeued item.

---
## implement an in-place queue with pointers, ie. a circular queue

```
  0   1   2   3   4   5   6      T = (H + Cnt) % n
| H |   |   |   |   |   |   |
| H | * | * | * | T |   |   |    T = (0 + 4) % 7 = 4
|   | H | * | * | * | T |   |    T = (1 + 4) % 7 = 5
| * | T |   |   | H | * | * |    T = (4 + 4) % 7 = 1
```

1. maintain *inclusive* head pointer, and number of items in queue, and calculate *exclusive* tail as needed.
1. init head to 0, and count to 0. (head is non-inclusive when queue is empty)
4. enqueue: find tail at `(head + count) % size`, set value and increment count
4. dequeue: move head pointer fwd by one, ie `(head + 1) % size`

**notes:**
* rather than maintaining head and tail pointers b/c easy to calc tail as (head + count) % array size
* often we implement queue with array back-to-front, such that end of array is front of queue, but front-to-front is more intuitive for circular queue, so that as you enqueue items you are filling the array front to back.

```js
function CQ(size) {
  let data = [];
  let head = 0; // exclusive (derived tail is inclusive)
  let count = 0;

  return {
    enq(val) {
      count++;
      let tail = (head + count) % size;
      data[tail] = val;

    },
    deq() {
      head = (head + 1) % size; // increment first b/c head is exclusive
      return head;
    }
  }
}
```
(untested)

---
## traverse binary tree in level-order (BFT)

1. initialize a queue with root item
2. while queue is not empty
3. _dequeue next in line
4. _process it
5. _enqueue its children

**javascript**

```js
function BFT(root) {
  let q = new Queue();
  q.enqueue(root);
  while (!q.isEmpty()) {
    let cur = q.dequeue();
    process(cur);
    for (child of [cur.left, cur.right]) {
      q.enqueue(child);
    }
  }
}
```

**notes:**

* related: right-side view of binary tree - https://leetcode.com/problems/binary-tree-right-side-view/

---
## implement a deque, ie. double-ended queue, ie "deck"

**front-to-front**

```js
function deque() {
  return {
    data: [],
    enqueue(val)  { return this.data.push(val)    },  //             data <- enqueue
    eject()       { return this.data.pop()        }   //             data -> eject
    dequeue()     { return this.data.shift()      },  //  dequeue <- data
    inject(val)   { return this.data.unshift(val) },  //   inject -> data
  }
}
```

---
## process a stream: compute running average

**queue**

```js
var MovingAverage = function(size) {
    this.size = size;
    this.queue = [];
    this.sum = 0;
};
MovingAverage.prototype.next = function(val) {
    this.queue.push(val);
    if(this.queue.length > this.size) {
        this.sum -= this.queue.shift();
    }
    this.sum += val;
    return this.sum / this.queue.length;
};
```
(untested)

**circular queue**

tbd...

see Moving Average from Data Stream - https://leetcode.com/problems/moving-average-from-data-stream/

---
## process stream: compute running median

same above, but use two [heaps]() instead! minHeap and maxHeap.

---
## implement a buffer for messaging/moves/etc.

---
## More Problems

1. Animal Shelter - see [full implementation](python\stacks_and_queues\animal_shelter.py)
3. Design Snake Game - https://leetcode.com/problems/design-snake-game/
4. Queue Reconstruction by Height - https://leetcode.com/problems/queue-reconstruction-by-height/
5. Sliding Window Maximum - https://leetcode.com/problems/sliding-window-maximum/

---
## asd
