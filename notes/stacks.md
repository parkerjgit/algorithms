<h2>Stacks</h2>

---

[TOC]

---

#### Stacks and Queues and great when its ok to black box the data (i.e., no search or arbitrary access)

#### Stacks are best when order really doesn't matter 

Stacks - Last in First Out (LIFO). Simple and very efficient so best when order doesn't matter. Use *Push* and *Pop* to insert/remove items from a stack, *Peek* to get top without removing. Theses are constant time `O(1)` operations!

```
Push:       O(1) 
Pop:        O(1)
Peek:       O(1)
```

**Stacks can be implemented using either arrays or linked lists**. If upper bound on the size of the container is known in advance, use a static array, otherwise use a linked list (or dynamic array).

#### Implement stack using Linked List is often overkill.

Python implementation.

```py
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Stack:
    def __init__(self):
        self.top = None

    def isEmpty(self):
        return True if self.top is None else False

    def pop(self):
        if self.isEmpty():
            return float("-inf") 
        temp = self.top
        self.top = self.top.next
        return temp.data

    def push(self, data):
        new_node = Node(data)
        new_node.next = self.top
        self.top = new_node

    def peek(self):
        if self.isEmpty():
            return float("-inf")
        return self.top.data

stack = Stack()
stack.push(1)
stack.push(2)
stack.pop()     # 2
stack.pop()     # 1
stack.pop()     # -inf
```

#### Implementing stack using a list (or an array if size known) is preferable.

Since we can push/pop off end of a list in constant time, preferable to use an list to implement stack, because less overhead. Implemenation in python is trivial b/c array has builtin push(append)/pop functions already, so don't really need to define a new class, but for sake of consistency:

```py
class Stack:
    def __init__(self):
        self.items = []

    def isEmpty(self):
        return self.items == []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if (self.isEmpty()):
            return float("-inf")
        return self.items.pop()

stack = Stack()
stack.push(1)
stack.pop()
```

or just do this:

```py
def createStack(): return []
def isEmpty(stack): return True if len(stack) == 0 else False
def push(stack, item): stack.append(item)
def pop(stack): stack.pop()

stack = createStack()
push(stack, 1)
pop(stack)
```

*Note*, could just as easily define front of array as top of stack, but that would make push/pop linear time operations due to all the element shifting.

Javascript implementation using prototypes:

```js
function Stack() {
    this.items = []
    this.isEmpty = function(){return this.items.length == 0}
    this.push = function(item){return this.items.push(item)}
    this.pop = function(){return this.items.pop()}
}
stack = new Stack()
stack.isEmpty()
stack.push(1)
stack.pop()
```

