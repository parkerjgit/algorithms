## Queue

### Stacks and Queues and great when its ok to black box the data (i.e., no search or arbitrary access)

Queues - First In First Out (FIFO) are the "Fairest". Trickier to implement than stacks so use when order matters, or when want to minimize max time any item spends in the container, or when FIFO ordering is required as it is for *Breadth First Search*. Use *Enqueue* and *Dequeue* to insert/remove items into/from back/front of queue.

Queues can be implemented using either arrays or linked lists. If upper bound on the size of the container is known in advance, use a static array, else use a linked list (or dynamic array).

### Implementing queue using Array

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

### Implementing queue with doubly-linked list

We can acheive constant-time enqueue/dequeue using a linked list, but that comes with some added overhead.