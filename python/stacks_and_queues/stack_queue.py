"""
question:
Implement a class which implements a queue using two stacks.

assumptions:
min() returns min value NOT node.

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 236.
EPI 8.8 Implement a queue usign stacks.
"""

from stacks_and_queues.stack import Stack


def pour_stack(pour_from, pour_to):
    """pour contents of one stack into another, reversing the order in the process"""

    while not pour_from.isEmpty():
        pour_to.push(pour_from.pop())


class StackQueue:
    """
    solution:
    By pouring contents back and forth between stacks, order will be reversed when in stack 2 and preserved in push
    order in stack 1. enqueue is then a matter of making sure items are in forward order stack, s1, before pushing
    to it, while dequeue requires that we make sure items are in reverse-order stack, s2, before poping from it.
    
    Time: O(n) - all operations are linear in the worst case, because if items are in wrong stack we have to move them.
    Space: O(n)

    This solution can be improved by simply pushing to stack 1 on enqueue, and popping from stack 2 on dequeue! 
    The only time we need to move items from one stack to another is when stack 2 is empty AND we are trying to dequeue. 
    In that case pour items in stack 1 into 2 and proceded.
    """

    def __init__(self):
        self.s1 = Stack()
        self.s2 = Stack()

    def enqueue(self, item):
        if not self.s2.isEmpty():
            pour_stack(self.s2, self.s1)
        self.s1.push(item)

    def dequeue(self):
        if not self.s1.isEmpty():
            pour_stack(self.s1, self.s2)
        return self.s2.pop()

    def peek(self):
        if not self.s1.isEmpty():
            pour_stack(self.s1, self.s2)
        return self.s2.peek()

"""
test
"""
if __name__ == '__main__':
    a = StackQueue()
    for i in range(10):
        a.enqueue(i)
    for i in range(10):
        assert a.dequeue() == i


