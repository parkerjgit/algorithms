# Linked Lists

## Implement a singly linked list

Javascript implementation fragment using class

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

Javascript implementation fragment using prototypes.

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

Javasript implementation fragment using regular objects (behavior delegation)

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

javascript implementation fragment using regular functions

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

## Traverse Linked List

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