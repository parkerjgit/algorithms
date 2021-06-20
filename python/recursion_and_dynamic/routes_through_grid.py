"""
question:
Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6
routes to the bottom right corner. How many such routes are there through a 20×20 grid?

source:
https://projecteuler.net/problem=15
Aziz, Adnan, Tsung-Hsien Lee, and Amit Prakash., Elements of programming
interviews in Python: the insiders' guide (2017) 264.
"""
import math


def routes_through_grid(num_rows, num_cols):

    routes = {}
    finish = (num_rows, num_cols)

    def count_routes(start):

        row, col = start
        rows_max, cols_max = finish

        if start == finish:
            # at finish
            return 1
        if row > rows_max:
            # out of bounds
            return 0
        if col > cols_max:
            # out of bounds
            return 0

        # get route count from the cell to right of this cell
        cell_right = (row, col + 1)
        if cell_right in routes:
            right = routes[cell_right]
        else:
            right = count_routes(cell_right)
            routes[cell_right] = right

        # get route count from the cell below this cell
        cell_below = (row + 1, col)
        if cell_below in routes:
            down = routes[cell_below]
        else:
            down = count_routes(cell_below)
            routes[cell_below] = down

        # return sum of routes right and down
        return right + down

    return count_routes((0, 0))

if __name__ == '__main__':

    print(routes_through_grid(20,20))
    assert routes_through_grid(20,20) == int(math.factorial(40)/math.factorial(20)/math.factorial(20))