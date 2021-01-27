// impl. stack with array

function Stack(size) {
  this.top = 0;
  this.contents = Array(size).fill(null);
}

Stack.prototype.push = function(item) {
  this.contents[top] = item;
  this.top ++;
}

Stack.prototype.pop = function() {
  this.top--;
  return this.contents[top];
}

// impl. stack with linked list

function Stack(size) {
  this.contents = new LinkedList();
  //this.top = this.contents.head;
}

Stack.prototype.push = function(item) {
  this.contents.add(item)
}

Stack.prototype.pop = function() {
  return this.contents.remove();
}

