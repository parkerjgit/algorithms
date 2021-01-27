"""
question:
Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth (e.g., if you have
a tree with depth D, you'll have D linked lists).

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 243.
"""
from trees_and_graphs.binary_tree import Node, BinaryTree
from linked_lists.linked_list import LinkedList


def list_of_depths(root):
    """
    Solution:
    Do a depth-first recursive traversal of tree, keeping track of levels, and building a list of linked lists as you
    go with list index equal to tree depth.
    Time: O(n)
    Space: O(n)
    """

    def build_list(node, list, depth):
        """ help function to build list of depths"""

        # stop recursion if not a node
        if not node:
            return

        # create new list if new level
        if len(list) == depth:
            list.append(LinkedList())

        # add node to list at this level
        list[depth].push(node.data)

        # recurse left and right
        build_list(node.left, list, depth + 1)
        build_list(node.right, list, depth + 1)

    list = []
    build_list(root, list, depth=0)
    return list

"""
test
"""
def linked_list_to_array(list):
    """ collapse a linked list into an array. """

    cur = list.head
    arr = []
    while cur:
        arr.append(cur.value)
        cur = cur.next
    return arr

def test_list_of_depths():

    #      1
    #     / \
    #    2   3
    #   / \   \
    #  4   5   6

    n4 = Node(4)
    n5 = Node(5)
    n2 = Node(2, left=n4, right=n5)
    n6 = Node(6)
    n3 = Node(3, right=n6)
    n1 = Node(1, left=n2, right=n3)

    assert [sorted(linked_list_to_array(depth)) for depth in list_of_depths(None)] == []
    assert [sorted(linked_list_to_array(depth)) for depth in list_of_depths(n2)] == [[2], [4, 5]]
    assert [sorted(linked_list_to_array(depth)) for depth in list_of_depths(n3)] == [[3], [6]]
    assert [sorted(linked_list_to_array(depth)) for depth in list_of_depths(n4)] == [[4]]
    assert [sorted(linked_list_to_array(depth)) for depth in list_of_depths(n1)] == [[1], [2, 3], [4, 5, 6]]
