class Node:
    def __init__(self, left = None, right = None, value = None):
        self.left = left
        self.right = right
        self.value = value

# --- impl stack

# array
s = []
s.append(1)
s.pop()

class Stack:
    def __init__(self):
        s = []

# --- impl stack

class Queue:
    def __init__(self):
        self.items = []

    def is_empty(self):
        return len(self.items) == 0

    def enqueue(self, item):
        self.items.insert(0, item)

    def dequeue(self):
        if (self.is_empty()):
            return None
        return self.items.pop()
