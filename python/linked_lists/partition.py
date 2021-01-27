"""
question:
Write code to partition a linked list around a value x, such that al  nodes less than x come before all nodes greater
than or equal to x. If x is contained within the list, the values of x only need to be after the elements less than x.
The partition element x can  appear  anywhere  in  the "right partition "; it does not need to appear between the left
and right partitions.

e.g.
Input:  3  ->  5  ->  8  ->  5  ->  10  ->  2  ->  1 [partition  =  5]
Output:  3  ->  1  ->  2  ->  10  ->  5  ->  5  ->  8

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 194.
"""
from linked_lists.linked_list import LinkedList


def partition(head, pivot):
    """
    Solution:
    Create two empty lists, left and right. Traverse input list, put all nodes less than pivot in left, and all nodes
    greater that pivot in right. Afterwards merge lists by connecting last node in left to first node in right.
    Time: O(n)
    Space: O(n)
    """

    left = LinkedList()
    right = LinkedList()

    cur = head
    while cur:
        if cur.value < pivot:
            left.push(cur.value)
        else:
            right.push(cur.value)
        next = cur.next
        cur = next

    # get last node in left
    left_end = left.head
    while left_end.next:
        left_end = left_end.next

    # merge: connect last node in left to first node in right
    left_end.next = right.head
    return left.head


"""
test
"""
def build_linked_list(values):
    ll = LinkedList()
    for v in values:
        ll.push(v)
    return ll.head

def linked_list_to_list(head):
    cur = head
    lst = []
    while cur:
        lst.append(cur.value)
        cur = cur.next
    return lst

def test_partition():
    partitioned_list = partition(build_linked_list([3,5,8,5,10,2,1]), 5)
    assert linked_list_to_list(partitioned_list) == [3,2,1,5,8,5,10]