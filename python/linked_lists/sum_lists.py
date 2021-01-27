"""
question:
You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in
reverse order, such that the 1's digit is at the head of the list. Write a function that adds the two numbers and
returns the sum as a linked list. follow up question: Suppose the digits are stored in forward order.

e.g.
Input:  (7 ->  1  ->  6)  +  (5  ->  9  ->  2) . That is, 617  +  295.
Output: 2 - > 1 - > 9. That  is,  912.

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 214.
"""
from linked_lists.linked_list import Node
from linked_lists.linked_list import LinkedList
from linked_lists.linked_list import LinkedListWithTail

def sum_nodes(a, b, carry):
    """get sum of node values plus carry"""

    res = carry

    if a:
        res += a.value
    if b:
        res += b.value

    return res

def get_list_length(head):
    """get length of linked list"""

    cur = head
    len = 0

    while cur:
        len += 1
        cur = cur.next

    return len

def pad_smaller(a, b):
    """pad smaller list with zeros until same size"""

    a_len = get_list_length(a)
    b_len = get_list_length(b)

    if a_len > b_len:
        for i in range(a_len - b_len):
            new_node = Node(0)
            new_node.next = b
            b = new_node
    elif b_len > a_len:
        for j in range(b_len - a_len):
            new_node = Node(0)
            new_node.next = a
            a = new_node
    else:
        pass

    return (a,b)

def sum_lists_rev_order(a, b):
    """
    Solution:
    Iterate through reverse-order linked lists.
    """

    res = LinkedListWithTail()
    carry = 0

    while a or b or carry:

        # calc sum
        sum = sum_nodes(a, b, carry)

        # set digit
        res.append(sum % 10)

        # get next
        if a:
            a = a.next
        if b:
            b = b.next

        # carry the one
        carry = 1 if sum > 9 else 0

    return res.head


def sum_lists_fwd_order(a, b):
    """
    Solution:
    Recurse through forward-order linked lists.
    """

    res = LinkedList()
    a, b = pad_smaller(a, b)

    def sum_next(a, b, res):

        # base case
        if not a:
            return 0

        # set next digit
        carry = sum_next(a.next, b.next, res)

        # set this digit
        sum = sum_nodes(a, b, carry)
        res.push(sum % 10)

        # return carry
        return 1 if sum > 9 else 0

    # sum lists get carry
    carry = sum_next(a, b, res)

    # push final 1 if carry
    if carry:
        res.push(1)

    return res.head

"""
test
"""
def linked_list(values):
    ll = LinkedList()
    for v in values:
        ll.push(v)
    return ll.head

def string_list(head):
    node = head
    res = ""
    while node:
        res += '{}'.format(node.value)
        if node.next:
            res += ' -> '
        node = node.next
    return res

def run_test(fn, x, y):
    return string_list(fn(linked_list(x), linked_list(y)))

def test_sum_lists_rev_order():
    assert run_test(sum_lists_rev_order, [6,1,7], [9,5]) == '2 -> 1 -> 7'

def test_sum_list_fwd_order():
    assert run_test(sum_lists_fwd_order, [7,1,6], [5,9]) == '7 -> 1 -> 2'
