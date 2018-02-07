class Node:

    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

    def __str__(self):
        return 'Node({})'.format(self.data)


class BinaryTree:

    def __init__(self, root):
        self.root = root