"""
question:
Write a recursive function to multiply two positive integers without using
the * operator (or / operator). You can use addition, subtraction, and bit
shifting, but you should minimize the number of those operations.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions
and Solutions 6th Edition (2015) 350.
"""
import math


def recursive_multiply(multiplier, multiplicand):
    """ multiply two integers recursively """

    # base cases
    if multiplier == 0:
        return 0
    if multiplier == 1:
        return multiplicand

    # subdivide multiplier by largest power of 2
    n = math.floor((math.log(multiplier, 2)))

    # update multiplier as remaining
    remaining = multiplier - (1 << n)

    # calculate partial products
    p1 = (multiplicand << n)
    p2 = recursive_multiply(remaining, multiplicand)

    # return sum of partial products
    return p1 + p2


def multiply(a, b):
    """ multiply two integers using recursive helper function """

    return recursive_multiply(min(a, b), max(a, b))


if __name__ == '__main__':
    assert multiply(15000000000,30000000000) == 450000000000000000000