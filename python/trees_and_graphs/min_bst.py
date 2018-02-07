"""
question:
Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search
tree with minimal height.

source:
McDowell, Gayle Laakmann, Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 242.
"""


class BstNode:

    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


class Bst:

    def __init__(self, root):
        self.root = root


def min_bst(arr):
    """
    Solution
    :param arr:
    :return:
    """

    # base case for empty array
    if not arr:
        return None

    # calc length and index of middle
    n = len(arr)
    i = (n - 1) // 2

    # partition array
    middle = arr[i]
    left = arr[0:i]
    right = arr[i+1:n]

    # create tree
    root = BstNode(middle)
    root.left = min_bst(left)
    root.right = min_bst(right)

    return root


"""
test
"""
def printTree(root):
    if root:
        printTree(root.left)
        print(root.data)
        printTree(root.right)

if __name__ == '__main__':
    a = [1,3,5,6,7,9,11]
    r = min_bst(a)
    printTree(r)