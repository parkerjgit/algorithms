"""
question:
How would you design a stack which, in addition to push and pop, has a function min
which returns the minimum element? Push, pop and min should all operate in 0(1) time.

assumptions:
min() returns min value NOT node.
No duplicates in stack. (well, I think this is handled by adding duplicate values == min to min stack, but EPI solution
to similar max stack problem instead maintains counts for values already in the list.

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 342.
"""


class Node:

    def __init__(self, value):
        self.value = value
        self.next = None


class Stack:

    def __init__(self):
        self.top = None

    def push(self, new_value):
        new_node = Node(new_value)
        new_node.next = self.top
        self.top = new_node

    def pop(self):
        temp = self.top()
        self.top = self.top.next
        return temp.value

    def peek(self):
        return self.top.value if self.top else None


class MinStack(Stack):

    def __init__(self):

        self.min = Stack()
        Stack.__init__(self)

    def push(self, new_value):

        # if new value is min, push min
        min_value = self.min.peek()
        if not min_value or new_value <= min_value:
            self.min.push(new_value)

        # push stack
        Stack.push(self,new_value)

    def pop(self):

        # if popped value is min, pop min
        if self.min.peek() == self.top.value:
            self.min.pop()

        # pop stack
        Stack.pop(self)

    def min(self):

        # get min value
        return self.min.peek()

    def peek(self):

        # get top value
        return Stack.peek(self)


"""
test min()
"""
def test_min():
    ms = MinStack()
    ms.push(4)
    assert ms.min.peek() == 4
    ms.push(7)
    assert ms.min.peek() == 4
    ms.push(3)
    assert ms.min.peek() == 3
    ms.push(5)
    assert ms.min.peek() == 3
    ms.push(9)
    assert ms.min.peek() == 3
