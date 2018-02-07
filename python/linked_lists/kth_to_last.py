"""
question:
Implement  an  algorithm to find the kth to last element  of  a singly linked list.

assumptions:
Return node value rather than node.
k is defined, such that k = 1 is the last element in list and k = 2 is the 2nd to last element.

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 209.
"""
from linked_lists.linked_list import LinkedList


def kth_to_last(k, head):
    """
    Solution 1: Brute force - Multiple passes
    Time: O(N)
    Space: O(1)
    """

    # pass 1: find location
    n = 0
    cur = head
    while cur:
        n += 1
        cur = cur.next
    kid = (n-k)

    # pass 2: find value by location
    i = 0
    cur = head
    while i < kid:
        cur = cur.next
        i += 1
    return cur.value


def kth_to_last2(k, head):
    """
    Solution 2: Better - Single pass
    Convert Linked list to array for quick item access. n-k-2 is index the kth to last element of n-element array.
    This is negligibly faster than brute force solution AND requires more space. So not very good unless you are going
    to be looking up for multiple values of k, so k should accept array for this solution to be viable.
    Time: O(N)
    Space: O(N)
    """
    cur = head
    arr = []
    while cur:
        arr.append(cur.value)
        cur = cur.next
    n = len(arr)
    return arr[n-k]


def kth_to_last3(k, head):
    """
    Solution 3: Best (CtCI Iterative solution)
    Maintain position of i and i-(k-1) as you traverse list. When i is last element, i-(k-1) is kth to last element.
    Time: O(N)
    Space: O(1)
    """
    front = head
    back = head
    i = 0
    while i < k:
        front = front.next
        i += 1
    while front:
        front = front.next
        back = back.next
    return back.value


def kth_to_last4(k, node):
    """
    Solution 3: Simplest (CtCI Recursive Solution)
    Recurse back-to-front until reach kth element. "simplest" because recursion is very well suited for counting from
    back-to-front, but have to bubble found value up the call stack if you want to return it, which is quite a bit of
    overhead.
    Time: O(N)
    Space: O(1)
    """
    i = 0

    def kth_to_last4_helper(k, node):

        nonlocal i

        # if end of list return Null:
        if not node:
            return None

        # otherwise recurse on rest
        target = kth_to_last4_helper(k, node.next)

        # count nodes back to front
        i += 1

        # if found return node
        if i == k:
            return node

        # if not found, return target
        return target if target else None

    return kth_to_last4_helper(k, node).value


"""
test
"""
def build_linked_list(values):
    ll = LinkedList()
    for v in values:
        ll.push(v)
    return ll.head

def test_kth_to_last():
    assert kth_to_last4(3, build_linked_list([3,5,7,9,11,13])) == 7

