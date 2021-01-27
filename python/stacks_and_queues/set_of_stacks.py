"""
Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would
likely start a new stack when the previous stack exceeds some threshold. Implement a data structure "SetOfStacks" that
mimics this. "SetOfStacks" a should be composed of several stacks and should create a new stack once the previous one
exceeds capacity. "SetOfStacks.push()" and "SetOfStacks.pop()" should behave identically to a single stack (that
is pop() should return the same values as it would if there were just a single stack). FOLLOW UP: Implement a function
"popAt(int index)" which performs a pop operation on a specific substack.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 194.
"""
from stacks_and_queues.stack import Stack


class SetOfStacks:

    def __init__(self, capacity):
        self.capacity = capacity
        self.stacks = []

    def push(self, value):

        if self.is_empty_set() or self.is_full_stack():

            # create/push new stack
            new_stack = Stack()
            new_stack.push(value)

            # add new stack to stacks
            self.stacks.append(new_stack)

        else:

            # push top stack
            top_stack = self.get_top_stack()
            top_stack.push(value)

    def pop(self):

        if self.is_empty_set():
            return float('-inf')
        else:

            # pop top stack
            top_stack = self.get_top_stack()
            popped = top_stack.pop()

            # remove top stack if empty
            if self.is_empty_stack():
                self.stacks.pop()

            return popped

    def pop_at(self):
        pass

    def get_top_stack(self):
        return self.stacks[-1] if self.stacks else None

    def is_empty_set(self):
        top_stack = self.get_top_stack()
        return True if not top_stack else False

    def is_full_stack(self):
        top_stack = self.get_top_stack()
        return True if len(top_stack.items) == self.capacity else False

    def is_empty_stack(self):
        top_stack = self.get_top_stack()
        return True if len(top_stack.items) == 0 else False

"""
test push() and pop()
"""
def test_push():
    set1 = SetOfStacks(capacity=2)
    for x in range(10):
        set1.push(x)
    assert len(set1.stacks) == 5

def test_pop():
    set2 = SetOfStacks(capacity=2)
    for x in range(10):
        set2.push(x)
    for x in reversed(range(10)):
        assert set2.pop() == x
    assert set2.pop() == float('-inf')
