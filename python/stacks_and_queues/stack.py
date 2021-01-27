"""
A simple stack implementation.
"""


class Stack:
    def __init__(self):
        self.items = []

    def isEmpty(self):
        return self.items == []

    def push(self, value):
        self.items.append(value)

    def pop(self):
        if (self.isEmpty()):
            return float("-inf")
        return self.items.pop()

    def peek(self):
        if (self.isEmpty()):
            return float("-inf")
        return self.items[-1]

    @property
    def length(self):
        return len(self.items)