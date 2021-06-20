"""
question:
A binary search tree was created by traversing through an array from left to right and inserting each element. Given
a binary search tree with distinct elements, print all possible arrays that could have led to this tree.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 262.
"""
from trees_and_graphs.binary_tree import Node


def weave_helper(sofar, sublist1, sublist2):
    """
    recursively weave sublists until one is empty, then concatenate whats left of the other to the weave so far.
    e.g.
    weave_rest([a], [b], [1,2]) => [[a,b,1,2], [a,1,b,2], [a,1,2,b]]
    weave_rest([a,b], [], [1,2]) => [[a,b,1,2]]
    """

    # if either list is empty append whats left of other to weave sofar
    if not sublist1 or not sublist2:
        return [sofar + sublist1 + sublist2]

    # get all weaves that result from two possible choices for next element in weave
    weaves1 = weave_helper(sofar[:] + [sublist1[0]], sublist1[1:], sublist2[:])
    weaves2 = weave_helper(sofar[:] + [sublist2[0]], sublist1[:], sublist2[1:])

    # return all possible weaves
    return weaves1 + weaves2


def weave(list1, list2):
    """
    weave two lists in all possible ways using recursive helper function.
    returns: list of lists
    """

    # check for empty lists
    if not list1 and not list2:
        return [[]]
    if not list1:
        return [list2]
    if not list2:
        return [list1]

    # find all weaves that begin with the first element from list1 and list2
    weaves1 = weave_helper([list1[0]], list1[1:], list2[:])
    weaves2 = weave_helper([list2[0]], list1[:], list2[1:])

    # return combined list of weaves
    return weaves1 + weaves2


def bst_sequences(node):
    """
    Find all possible arrays that could have led to the bst by traversing through arrays from
    left to right and inserting each element into tree.
    requires: valid bst node
    returns: exhaustive list of bst sequences as defined above.
    """

    # check for empty nodes and leaf nodes
    if not node:
        return [[]]
    if not node.left and not node.right:
        return [[node.data]]

    # get all sequences in left and right subtrees
    left_sequences = bst_sequences(node.left)
    right_sequences = bst_sequences(node.right)

    # weave together and prepend node value to each
    weaved = [weave(i, j) for j in right_sequences for i in left_sequences]
    prepended = [[node.data] + w for w in sum(weaved, [])]

    return prepended

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

    assert bst_sequences(n5) == [[5, 3, 2, 4, 6, 7],
                                 [5, 3, 2, 6, 4, 7],
                                 [5, 3, 2, 6, 7, 4],
                                 [5, 3, 6, 2, 4, 7],
                                 [5, 3, 6, 2, 7, 4],
                                 [5, 3, 6, 7, 2, 4],
                                 [5, 6, 3, 2, 4, 7],
                                 [5, 6, 3, 2, 7, 4],
                                 [5, 6, 3, 7, 2, 4],
                                 [5, 6, 7, 3, 2, 4],
                                 [5, 3, 4, 2, 6, 7],
                                 [5, 3, 4, 6, 2, 7],
                                 [5, 3, 4, 6, 7, 2],
                                 [5, 3, 6, 4, 2, 7],
                                 [5, 3, 6, 4, 7, 2],
                                 [5, 3, 6, 7, 4, 2],
                                 [5, 6, 3, 4, 2, 7],
                                 [5, 6, 3, 4, 7, 2],
                                 [5, 6, 3, 7, 4, 2],
                                 [5, 6, 7, 3, 4, 2]]

