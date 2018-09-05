function LinkedlistNode(value) {
  this.value = value;
  this.next = null;
}

function LinkedList() {
  this.head = null;
}

LinkedList.prototype.add = function(value) {
  var newNode = new LinkedlistNode(value);
  newNode.next = this.head;
  this.head = newNode;
}

LinkedList.prototype.remove = function() {

  if (this.head) { // at least one node
    var removed = this.head;
    this.head = this.head.next;
    return removed.value;

  } else { // no nodes
    return null;
  }
}

LinkedList.prototype.contains = function(targetValue) {
  var curNode = this.head;
  while (curNode && curNode.value != targetValue) {
    curNode = curNode.next;
  }
  return !!curNode;
}

LinkedList.prototype.length = function() {
  var len = 0,
      cur = this.head;

  while (cur.value) {
    cur = cur.next;
    len++;
  }

  return len;
}

// driver
let myList = new LinkedList()
let values = [1,2,3,4,5,6,7,8,9];
values.forEach((v)=>{
  myList.add(v);
})
