"""
question:
Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree is
defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 244.
"""
from trees_and_graphs.binary_tree import Node

def check_balanced(root):
    """
    Solution:
    Use helper function to recursively traverse tree from the bottom-up checking that each node is a balanced subtree
    and passing its height up to its parent node if it is, bubbling up an error code (or raising an exception) if its
    not. In this way the height at any node is calculated as the height of the larger of its two subtrees, left and
    right, plus one. If height of root is calculated and is valid (or without an exception being thrown), we know
    that it is balanced. Exception Throwing is faster because no time wasted bubbling up error code, but it also seemed
    slightly less of a language agnostic approach, which is what I am aiming for here.
    Time: O(n)
    Space: O(h), where h is height of tree
    """

    def get_height(node):
        """ return height of node if its balanced else return None"""

        # stop recursion when no more nodes
        if not node:
            return 0

        # get heights of subtrees
        left_height = get_height(node.left)
        right_height = get_height(node.right)

        # check for imbalance
        if left_height < 0:
            return -1
        if right_height < 0:
            return -1
        if abs(left_height - right_height) > 1:
            return -1

        # this node is balanced! return height
        return max(left_height, right_height) + 1

    # tree is balanced if height is valid
    return get_height(root) > 0


"""
test
"""
def test_check_balanced():

    # Single node
    n1 = Node(1)
    assert check_balanced(n1) == True

    #      1
    #     / \
    #    2   3

    n2 = Node(2)
    n3 = Node(3)
    n1 = Node(1, left=n2, right=n3)

    assert check_balanced(n1) == True

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

    assert check_balanced(n1) == True

    #      1
    #     / \
    #    2   3
    #         \
    #          4
    #           \
    #            5

    n2 = Node(2)
    n5 = Node(5)
    n4 = Node(4, right=n5)
    n3 = Node(3, right=n4)
    n1 = Node(1, left=n2, right=n3)

    assert check_balanced(n1) == False

    #      1
    #     / \
    #    2   3
    #       / \
    #      4   5
    #     / \   \
    #    6   7   8

    n8 = Node(8)
    n7 = Node(7)
    n6 = Node(6)
    n4 = Node(4, left=n6, right=n7)
    n5 = Node(5, right=n8)
    n3 = Node(3, left=n4, right=n5)
    n2 = Node(2)
    n1 = Node(1, left=n2, right=n3)

    assert check_balanced(n1) == False
