"""
question:
Write a program to sort a stack such that the smallest items are on the top. You can use
an additional temporary stack, but you may not copy the elements into any other data structure
(such as an array). The stack supports the following operations: push, pop, peek, and is Empty.

assumptions:
sort() is a method of sortable stack class.

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 237.
"""
from stacks_and_queues.stack import Stack


class SortStack(Stack):
    """ Stack class with sort method added"""

    def __init__(self):
        Stack.__init__(self)

    def merge_sort(self):
        """
        solution:
        Modified merge sort requires creation two additional stacks per level of recursion
        because we can't index items as we would with typical array-based merge sort.
        Time: O(nlogn)
        Space: O(nlong)
        """

        def merge(s1, s2, order):
            """ merge two stacks """

            res = Stack()

            # merge stacks by comparing top value and
            # pushing bigger value until one is empty
            while not s1.isEmpty() and not s2.isEmpty():
                if order == 'down':
                    if s1.peek() < s2.peek():
                        res.push(s1.pop())
                    else:
                        res.push(s2.pop())
                else: # order == 'up'
                    if s1.peek() > s2.peek():
                        res.push(s1.pop())
                    else:
                        res.push(s2.pop())

            # push rest of s1
            while not s1.isEmpty():
                res.push(s1.pop())

            # push rest of s2
            while not s2.isEmpty():
                res.push(s2.pop())

            # return new merged stack
            return res

        def sort(s, size, order):
            """ sort a stack """

            # base case when stack size is 1
            if size <= 1:
                return s

            # pour half stack into new top stack
            top = Stack()
            top_size = size //2
            for i in range(top_size):
                top.push(s.pop())

            # bottom stack is whats left
            bot = s
            bot_size = size - top_size

            # toggle order
            if order == 'down':
                order = 'up'
            else:
                order = 'down'

            # sort top and bottom
            top_sorted = sort(top, top_size, order)
            bot_sorted = sort(bot, bot_size, order)

            # merge top and bottom stacks
            return merge(top_sorted, bot_sorted, order)

        return sort(self, self.length, 'up')


"""
test
"""
if __name__ == '__main__':
    a = SortStack()
    a.push(3)
    a.push(7)
    a.push(11)
    a.push(9)
    a.push(5)
    a.push(13)
    b = a.merge_sort()
    while b.items:
        print(b.pop())