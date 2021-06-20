"""
A simple linked list.
"""

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def push(self, item):
        new_node = Node(item)
        new_node.next = self.head
        self.head = new_node

    @property
    def lenth(self):
        cur = self.head
        res = 0
        while cur:
            res += 1
            cur = cur.next
        return res

class LinkedListWithTail:
    def __init__(self):
        self.head = None
        self.tail = None

    def push(self, item):
        new_node = Node(item)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node

    def append(self, item):
        new_node = Node(item)
        if not self.tail:
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
