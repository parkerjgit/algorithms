## Linked List

see [Linked-List](./markdown/linked_lists/linked_lists.md)

### Use Linked list for fast update (insertion and deletion) when you can afford the overhead (~40 bytes/node vs ~4 for an array cell)

A reference is a memory address and thus uses 8 bytes of memory (on a 64-bit machine). So more memory is required to reference an int than is required to store an int! Also, don't forget that an inner class is essentially a class with a reference to the outer class. So a linked list node object implemented as an inner class with a pointer value requires ~ 40 bytes of memory! Compare that to the ~ 4 bytes required for an array cell.

![](http://algs4.cs.princeton.edu/14analysis/images/Node-memory.png)

### Use for more **run-time flexibility**, when not simply growing array from one end.

Like dynamic arrays, overflow can never occur unless memory fills.

### Use Linked list for **simplicity and stability** of moving pointers over content.

Insertions/deletions are simpler, as are swaps, moves, etc... because moving pointers is easier than moving items.

### Careful!: Linear random access time means updates will degrade to linear time also unless we know the location of node!

Note, Linear access time means insertion and deletion are also going to perform in linear time unless we some how already know the location of insertion/deletion, e.g. all of our insertions are at the begining of the list if we are implementing a queue.

```
Access:     O(n)
Search:     O(n)

Insertion:  O(1) (IF we are at the position where we have to insert an element. Worst case linear O(n) otherwise)
Deletion:   O(1) (IF we know address of node previous the node to be deleted. Worst case linear O(n) otherwise)
```

### A **Singly Linked List** is recursively defined as a ref to the first, or "head" node, where each node contains data and a ref to the "next" node.

Each *node* in a linked list is an object comprised of two items, the *data* or *value* and a reference to the *next* node. We also need a reference to the *head* of the linked list:

```py
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    ...
```

### A **Doubly Linked List** *also* contains a ref to the last, or "tail" node, and each node also contains ref to the "previous" node.

### Whether singly or doubly linked, the tail's next field is typically null, though sometimes a **sentinal**, or "dummy" node is used to mark the end (or start) of list.

### Traverse/Search a linked list iteratively or recursively.

For simple traversal, prefer an iterative implementation (to avoid recursion overhead). When its more natural to recurse, as with arbitrary trees/graphs recursion overhead often a fair price.

searching recursively:

If item is in the list, it is the first element or located in the rest of the list. Eventually, we reduce the problem to searching in an empty list, ie  list with head = None.

```py
class LinkedList:
    ...

    def search(head, item):                # head defines a sublist

        if head == None:                    # not in list
            return False
        if head == item:                    # found it!
            return True

        return search(head.next, item)      # search rest of list
```

search iteratively:

Iterate through linked list until find node or reach end, then test to see which break condition was met.

```py
class LinkedList:
    ...

    def search(head, item):

        cur = head
        while cur != None and cur != item:
            cur = cur.next

        if cur == None:                    # not in list
            return False
        if cur == item:                    # found it!
            return True

```

### When implementing **insert** [after], be careful to set the "next" reference of the new node first.

### When implementing **delete** [after], just set next to the next next node.

### Linked lists are not a standard type in python, but collections.deque does provide a double-ended queue (deque)

Implemented as a doubly linked list internally, it supports extending/appending and removing elements in O(1) from either end, termed "left" and "right".

```py
# Add to the right
d = collections.deque()
d.extend('de')
d.append('f')
d.extendleft('cb') # note, string gets split and appended left to right, so gets reversed
d.appendleft('a')
d.pop()
d.popleft()
```

https://www.geeksforgeeks.org/deque-in-python/

### Consider using a "dummy head", i.e. sentinal node, to avoid having to check for empty list. (EPI 83)

### Consider using two iterators, one ahead of other, or one quicker than other. (EPI xxx)
