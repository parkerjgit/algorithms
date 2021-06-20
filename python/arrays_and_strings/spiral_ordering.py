"""
question:
Write a program which takes an n x n 2d array and returns the spiral ordering.

For example, the following 2d array representation of 3 x 3 matrix has spiral ordering is [1,2,3,6,9,8,7,4,5]

[[1 2 3]
 [4 5 6]
 [7 8 9]]

source:
EPI 5.18: compute the spiral ordering of a 2d array
"""


def spiral_ordering(matrix):
    """
    Solution: todo...

    :param matrix:
    :return:
    """

    # size of matrix
    n = len(matrix)

    def _get_layer_at_depth(i):

        # size of sub matrix
        m = n - 2 * i

        # sides of sub-matrix in clockwise order (non-overlapping)
        top = matrix[i][i: i + m - 1]
        right = [row[i + m - 1] for row in matrix[i: i + m - 1]]
        bottom = list(reversed(matrix[i + m - 1][i + 1: i + m]))
        left = [row[i] for row in reversed(matrix[i + 1: i + m])]

        return top + right + bottom + left

    # get the spiral ordering from depth i inward recursively.
    def _get_layers_from_depth(i):

        # size of sub matrix
        m = n - 2 * i

        # odd number of layers, return middle cell.
        if (m == 1):
            return [matrix[i][i]]

        # even number of layers. done.
        if (m == 0):
            return []

        return _get_layer_at_depth(i) + _get_layers_from_depth(i + 1)

    return _get_layers_from_depth(0)


# test
def test_spiral_ordering():
    assert spiral_ordering(
        [[1, 2, 3],
         [4, 5, 6],
         [7, 8, 9]]) == [1, 2, 3, 6, 9, 8, 7, 4, 5]
    assert spiral_ordering(
        [[1, 2, 3, 4],
         [5, 6, 7, 8],
         [9, 10, 11, 12],
         [13, 14, 15, 16]]) == [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
