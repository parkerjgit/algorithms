"""
question:
You are given two 32-bit numbers, N and M, and two bit positions, i and j.
Write a method to insert M into N such that M starts at bit j and ends at
bit i. You can assume that the bits j through i have enough space to fit all
of M. That is, if M = 10011, you can assume that there are at least 5 bits
between j and i. You would not, for example, have j=3 and i=2, because M could
fully fit between bit 3 and bit 2

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions
and Solutions 6th Edition (2015) 194.
"""

def insert_m_into_n(n, m, i, j):
    """
    solution:
    clear bits i through j, left shift m by i, merge.
    """

    # clear bits i thru j
    ones = (1 << (j - i + 1)) - 1
    mask = ones << i
    n_set = n | mask
    n_cleared = n_set ^ mask

    # shift m by i
    m_shifted = m << i

    # merge
    return n_cleared | m_shifted

"""
test
"""
def test_insert_m_into_n():
    assert insert_m_into_n(0b10000100000, 0b10011, 2, 6) == 0b10001001100