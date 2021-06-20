"""
question:
Implement a function to check if a linked list is a palindrome.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 216.
"""
from linked_lists.linked_list import LinkedList
from stacks_and_queues.stack import Stack

def is_palindrome(a_linked_list):
    """
    Solution: iterative via stack
    Traverse first half of list, loading each element into a stack. Then traverse rest of list, matching each element
    in second half with a element from first popped from the stack.
    Time: O(n)
    Space: O(n) - stack is half the size of list
    """

    # empty stack to cache first half of list
    visited = Stack()
    i = 0
    n = a_linked_list.length

    # traverse first half
    # if even number of elements:
    #   0       m   3
    # | 1 | 2 | 2 | 1 |
    # if odd number of elements:
    #   0       m       4
    # | 1 | 2 | 3 | 2 | 1 |
    cur = a_linked_list.head
    while i <= n // 2:
        visited.push(cur.value)
        cur = cur.next
        i += 1

    # advance one more if odd number of elements
    #   0           m   4
    # | 1 | 2 | 3 | 2 | 1 |
    if n % 2 != 0:
        cur = cur.next
        i += 1

    # match nodes in second half with items in stack
    while cur:
        if visited.pop() != cur.value:
            # mismatch so not a palindrome
            return False
        else:
            # so far so good
            cur = cur.next

    # it's a palindrome!
    return True

def is_palindrome2(a_linked_list):
    """
    Solution 2: recursive
    Time: O(n)
    Space: O(n) - recursive call stack is half the size of the list
    """

    # size of list
    n = a_linked_list.length

    # its a candidate until we find a mismatch
    is_candidate = True

    def get_ith_from_back(node, i):
        """ recursive helper function retrieves the element ith from last """

        nonlocal n, is_candidate

        # base case reached at middle of list
        if i >= n // 2 and i % 2 == 0:
            return node.value
        if i >= n // 2 and i % 2 != 0:
            # skip middle node
            return node.next.value

        # get ith from back
        ith = get_ith_from_back(node, i+1)

        # is it still a palindrome?
        if node.value != ith:
            is_candidate = False

        # return ith from back
        return node.value

    # get last element
    ith = get_ith_from_back(a_linked_list.head, 0)

    # if its still a candidate, make sure last element matches first
    if is_candidate:
        return node.value == ith
    else:
        return False

"""
test tbd...
"""



