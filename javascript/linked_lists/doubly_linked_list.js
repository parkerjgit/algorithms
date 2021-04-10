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

  add(val) {
      const newNode = new Node(val);
      if(!this.head) {
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
