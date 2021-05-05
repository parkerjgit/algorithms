# Linked Lists

## Notes

1. Use for **fast update** (insertion and deletion) when you can afford the overhead (~40 bytes/node vs ~4 for an array cell)
2. Use for more **run-time flexibility**, when not simply growing array from one end.
3. Use Linked list for **simplicity and stability** of moving pointers over content.
2. Careful!: Linear random access time means updates will degrade to linear time also unless we know the location of node! (e.g. queue)
3. *Use* for fast **queue implementation**
4. A **Singly Linked List** is recursively defined as a ref to the first, or "head" node, where each node contains data and a ref to the "next" node.
5. A **Doubly Linked List** *also* contains a ref to the last, or "tail" node, and each node also contains ref to the "previous" node.
6. Traverse/Search a linked list iteratively or recursively.
7. When implementing **insert** [after], be careful to set the "next" reference of the new node first.
8. When implementing **delete** [after], just set next to the next next node.
10. Consider using a "dummy head", i.e. sentinal node, to avoid having to check for empty list. (EPI 7.1)
11. Consider using two iterators, one ahead of other, or one quicker than other, eg. for detecting cycles (EPI 7.3)

12. Merge sorted linked lists by traversing both and appending smaller at each step until one is empty, then append rest of the other by pointing tail at `L1 or L2`
13. Reverse a sublist in single pass by keeping index of head/first node, h/f of sublist, and stepping through each node pair i/j in sublist: pointing first f at j.next, pointing j node at previous node i, and pointing head h, at j. (e.g., EPI 7.2)

**Python:**

1. Linked lists are not a standard type in python, but **collections.deque** does provide a double-ended queue (deque)

---
## Implement a singly linked list using class

```js
class LinkedListNode {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(value) {
    let newNode = new LinkedListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size += 1;
  }
  ...
}
```

---
## Implement a singly linked list using prototypes.

```javascript
function LinkedListNode(value) {
  this.data = value;
  this.next = null;
}
function LinkedList() {
  this.head = null;
}
LinkedList.prototype = {
  add(value) {
    let newNode = new LinkedListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size += 1;
  },
  ...
}

let myList = new LinkedList();
myList.add(5);
```
(from [xxx](../../javascript/xxx))

---
## Implement a singly linked list using regular objects (behavior delegation)

```js
const LinkedListNode = {
  init(value) {
    this.data = value;
    this.next = null;
  }
}
const LinkedList = {
  init() {
    this.head: null,
    this.size: 0
  }
  add(value) {
    let newNode = Object.create(LinkedListNode);
    newNode.init(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size += 1;
  }
}

let myList = Object.create(LinkedList);
myList.init();
myList.add(5);
```

---
## Implement a singly linked list using regular functions

```js
function LinkedListNode(value) {
  return {
    data: value,
    next: null
  }
}
function LinkedList() {
  return {
    head: null,
    size: 0,
    add(value) {
      let newNode = new LinkedListNode(value);
      newNode.next = this.head;
      this.head = newNode;
      this.size += 1;
    }
  }
}

let myList = new LinkedListNode();
myList.add(5);
```

---
## Traverse Linked List iteratively and recursively

Javascript implementation of iterative solution

```javascript
function traverse(linkedList) {
  let cur = linkedList.head;
  while (cur) {
    // process node here...
    cur = cur.next;
  }
}
```
(from [xxx](../../javascript/xxx))

Javascript implementation of recursive solution

```javascript
function traverse(linkedList) {
  let cur = linkedList.head;
  function _traverse(node) {
    if (node) {
      // process node here...
      traverse(node.next);
    }
  }
}
```
(from [xxx](../../javascript/xxx))

---
## Implement a doubly-linked list

```js
class Node {
  constructor(val) {
      this.val = val;
      this.next = null;
      this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
  }

  add(val) { // add to tail
      const newNode = new Node(val);
      if(!this.head) { // empty list
          this.head = newNode;
          this.tail = newNode;
      } else {
          this.tail.next = newNode;
          newNode.prev = this.tail;
          this.tail = newNode;
      }
      this.length++;
      return newNode;
  }

  remove(node) {
      if(!node.next && !node.prev) { // there is only 1 node
          this.head === null;
          this.tail === null;
      } else if(!node.next) { // node to remove is tail node
          this.tail = node.prev;
          this.tail.next = null;
      } else if(!node.prev) { // node to remove is head node
          this.head = node.next;
          this.head.prev = null;
      } else { // node to remove is between head and tail
          const prev = node.prev;
          const next = node.next;
          prev.next = next;
          next.prev = prev;
      }
      this.length--;
  }
}
```

---
## Implement LRU Cache

```js
class LRUCache {
  constructor(capacity) {
      this.DLL = new DoublyLinkedList(); // <-head(oldest)-------tail(newest)->
      this.map = {}; // map key -> linked list node
      this.capacity = capacity;
  }

  get(key) {
      if(!this.map[key]) return -1;
      const value = this.map[key].val;

      // move node to tail
      this.DLL.remove(this.map[key]);
      this.map[key] = this.DLL.add(key, value);

      return value;
  }

  put(key, value) {

      // if exists, move to tail, else just add to tail
      if(this.map[key]) this.DLL.remove(this.map[key]);
      this.map[key] = this.DLL.add(key, value);

      // if over capacity, remove from head and delete corresponding entry in dict
      if(this.DLL.length > this.capacity) {
          const currKey = this.DLL.head.key;
          delete this.map[currKey];
          this.DLL.remove(this.DLL.head);
      }
  }
}
```

another good approach uses orderedDict (ie es6 map) to retrieve oldest entry. see https://leetcode.com/problems/lru-cache/solution/

---
## More Questions

1. add numbers repr. as linked list of digits
1. find kth to last node
1. find intersection
1. partition a linked list around a value
1. delete node in middle, given only node (not given head)
1. find cycles
1. reverse list/sublist in single pass
1. copy a linked list with random pointer - [solution](./../../javascript/linked_lists/copy_list_with_random_pointer.js)
