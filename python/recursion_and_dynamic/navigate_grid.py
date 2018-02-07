"""
question:
Imagine a robot sitting on the upper left corner of grid with r rows and c columns. The robot can only move in two
directions, right and down, but certain cells are "off limits" such that the robot cannot step on them. Design an
algorithm to find a path for the robot from the top left to the bottom right.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 344.
"""

def navigate_grid(grid, start, finish):

    path_map = {}
    row_max = len(grid)-1
    col_max = len(grid[0])-1

    def path_from(row, col):
        """ get path to finish from the cell at (row,col) """

        # base cases
        if (row, col) == finish:
            # at goal
            return [(row,col)]
        if row > row_max:
            # out of bounds
            return False
        if col > col_max:
            # out of bounds
            return False
        if grid[row][col] == 0:
            # hit obstacle, i.e. "off limits"
            return False

        # get path from the cell to right of this cell
        cell_right = (row, col + 1)
        if cell_right in path_map:
            right_path = path_map[cell_right]
        else:
            right_path = path_from(*cell_right)
            path_map[cell_right] = right_path

        # get path from the cell below this cell
        cell_below = (row + 1, col)
        if cell_below in path_map:
            down_path = path_map[cell_below]
        else:
            down_path = path_from(*cell_below)
            path_map[cell_below] = down_path

        # choose best path, and copy
        if down_path and not right_path:
            # down only valid path, go down
            new_path = down_path[:]
        elif right_path and not down_path:
            # right only valid path, go right
            new_path = right_path[:]
        elif right_path and down_path:
            # both paths valid, go right
            new_path = right_path[:]
        else:
            # dead end
            return False

        # append this cell to path
        new_path.append((row, col))
        return new_path

    return path_from(*start)

"""
test
"""
def test_navigate_grid():
    grid = [[1,1,0,1,1],
            [1,1,1,1,0],
            [0,1,0,1,1],
            [1,0,1,1,1],
            [1,1,1,1,1]]
    assert navigate_grid(grid, (0,0), (4,4)) == [(4,4), (3,4), (2,4), (2,3), (1,3), (1,2), (1,1), (0,1), (0,0)]
    assert navigate_grid(grid, (4, 4), (4, 4)) == [(4, 4)]
    assert navigate_grid(grid, (3, 1), (4, 4)) == False
