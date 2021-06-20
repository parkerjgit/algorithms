"""
question:
Implement a function to check if a binary tree is a binary search tree.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 245.
"""
from trees_and_graphs.binary_tree import Node

def validate_bst(root):
    """
    solution:
    Traverse tree in order, keeping track of previous node visited. Then for each node visited,
    if node value is less than previous node value, its not a bst.
    Time: O(n) - linear time complexity is best conceivable
    Space: O(logn) - recursive call stack size equal to tree height (logn for binary tree).
    """

    # previous node visited in-order
    prev = None

    def validate_node(node):

        nonlocal prev

        # recursion base case
        if not Node:
            return True

        # test left
        if node.left and not validate_node(node.left):
            return False

        # test this node in order
        if prev and node.data <= prev:
            return False
        prev = node.data

        # test right
        if node.right and not validate_node(node.right):
            return False

        # validated
        return True

    return validate_node(root)

"""
test
"""

if __name__ == '__main__':

    #      5
    #     / \
    #    3   6
    #   / \   \
    #  2   4   7

    n2 = Node(2)
    n4 = Node(4)
    n3 = Node(3, left=n2, right=n4)
    n7 = Node(7)
    n6 = Node(6, right=n7)
    n5 = Node(5, left=n3, right=n6)

    print(validate_bst(n5))
    assert validate_bst(n5) == True