// prototypical
function BST(value = null) {
    this.left = null;
    this.right = null;
    this.value = value;
}
BST.prototype.insert = function(value) {
    //...
}
let myBST = new BST(1)
myBST.insert(2)

// classical
class BST {
    constructor(value = null) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    insert(value) {
        //...
    }
}
let myBST = new BST(1)
myBST.insert(2)

// behavior delegation
let BST = {
    init(value = null) {
        this.left = null;
        this.right = null;
        this.value = value;
    },
    insert(value) {
        //...
    }
}
let myBST = Object.create(BST)
myBST.init(1)
myBST.insert(2)


---

// use array
let s = [];
s.push();
s.pop();

// use linked list
let s = new LinkedList();
s.push(1)
s.pop()

// classical
class Stack {
    constructor() {
        let stack = [];
    }
    push(value) {
        stack.push(value);
    }
    pop() {
        return s.pop()
    }
}
let myStack = new Stack();

// --- impl queue

// use array
// let q = []
// q.unshift(1) // enqueue
// q.pop() // dequeue

// behav delegation

let q = {
    init: function() {
        this.items = [];
    },
    isEmpty: function() {
        return this.items.length === 0
    },
    enqueue: function(item) {
        this.items.unshift(item);
    },
    dequeue: function() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.items.pop()
        }
    }
}
let myq = Object.create(q);
myq.init()
myq.enqueue(1)
myq.dequeue()

// closure
let qFn = () => q;
let myq2 = new qFn();
