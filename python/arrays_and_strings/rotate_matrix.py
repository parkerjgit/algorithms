"""
question:
Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the
image by 90 degrees. Can you do this in place?

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 203.
"""

def rotate_matrix_90(matrix):
    """ rotate matrix in-place 90 degrees clockwise """

    matrix_size = len(matrix)
    num_levels = matrix_size // 2

    def rotate_level(cur_level):
        """ rotate a level of matrix in-place 90 deg """

        nonlocal matrix, matrix_size, num_levels

        # first and last(exclusive) matrix indexes of rows and cols in this level
        first = num_levels - cur_level
        last = (matrix_size - 1) - first

        # swap values from top, left, bottom and right sides
        # in-place (with help of temp var) to effect rotation
        for i in range(first, last, 1):

            # temp = top
            temp = matrix[first][i]
            # top = left
            matrix[first][i] = matrix[last - i][first]
            # left = bottom
            matrix[last - i][first] = matrix[last][last - i]
            # bottom = right
            matrix[last][last - i] = matrix[i][last]
            # right = temp
            matrix[i][last] = temp

    # rotate each level of matrix
    cur_level = num_levels
    while cur_level > 0:

        rotate_level(cur_level)
        cur_level -= 1

"""
test
"""
if __name__ == '__main__':

    m = [[1,2],[3,4]]
    m1 = [[1,2,3],[4,5,6],[7,8,9]]
    m2 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]

    rotate_matrix_90(m)
    rotate_matrix_90(m1)
    rotate_matrix_90(m2)

    assert m == [[3,1],[4,2]]
    assert m1 == [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
    assert m2 == [[13, 9, 5, 1], [14, 10, 6, 2], [15, 7, 11, 3], [16, 12, 8, 4]]