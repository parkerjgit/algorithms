function BST(value=null) {
  this.value = value;
}

BST.prototype.add = function(itemValue) {

  // no nodes
  if (!this.value) {
    this.value = itemValue;

  } else if (itemValue < this.value) { // go left
    if (this.left) {
      this.left.add(itemValue);
    } else {
      this.left = new BST(itemValue);
    }

  } else { // go right
    if (this.right) {
      this.right.add(itemValue);
    } else {
      this.right = new BST(itemValue);
    }
  }
}

BST.prototype.min = function() {

  // null tree - tbd

  var cur = this;
  while (cur.left) {
    cur = cur.left;
  }
  return cur.value;
}

BST.prototype.max = function() {

  // null tree - tbd

  var cur = this;
  while (cur.right) {
    cur = cur.right;
  }
  return cur.value;
}

BST.prototype.insert = function(value) {

  if (typeof this.value === 'undefined') { // null tree
    this.value = value;
  } else if (value < this.value) { // go left
    if (this.left) {
      this.left.insert(value);
    } else {
      this.left = new BST(value);
    }
  } else { // go right
    if (this.right) {
      this.right.insert(value);
    } else {
      this.right = new BST(value);
    }
  }
}


BST.prototype.contains = function(targetVal) {

  if (typeof this.value === 'undefined') {
    return false;
  }
  if (typeof this.value === targetVal) {
    return true;
  }

  if (targetVal < this.value) {
    return this.left ? this.left.contains(targetVal) : false;
  } else {
    return this.right ? this.right.contains(targetVal) : false;
  }
}

BST.prototype.dft = function() {
  //...

}
