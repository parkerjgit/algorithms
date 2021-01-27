"""
question:
There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a
character. Given two strings, write a function to check if they are one edit (or zero edits) away.

e.g.
pale,   ple     -> true
pales,  pale    -> true
pale,   bale    -> true
pale,   bae     -> false

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 199.
"""

def one_away(before, after):
    """
    Solution:
    Index the first and last element of each char array as i,j and m,n respectively. While indexed elements are the
    same from left to right, increment the ids i,m. While elements are same from right to left, decrement the
    ids j,n. Then, for either array, if end index is larger than start index, the strings must be different by more
    than one character.

    e.g.
           i ->     <- j
    bef: | p | a | l | e |
    aft: | p | l | e |
           m -> <- n

    Time:  O(n)
    Space: O(1)
    """

    # length can't diff by more than one
    if len(before) - len(after) > 1:
        return False

    # create char arrays
    before = list(before)
    after = list(after)

    # index first and last elements
    i,j = 0, len(before) - 1
    m,n = 0, len(after) - 1

    # locate difference
    while i <= j and m <= n:

        if before[i] == after[m]:
            i += 1
            m += 1
        elif before[j] == after[n]:
            j -= 1
            n -= 1
        else:
            break

    # check if diff by more than one character
    return False if (j > i) or (n > m) else True


def test_one_away():
    assert one_away('pale', 'ple') == True
    assert one_away('pales', 'pale') == True
    assert one_away('pale', 'bale') == True
    assert one_away('pale', 'bae') == False
