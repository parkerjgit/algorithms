"""
question:
Given a string, write a function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that
is the same forwards and backwards. A permutation  is a rearrangement of letters. The palindrome does not need to be
limited to just dictionary words.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 194.
"""

def is_palindrome_perm(str):
    """
    Solution 1:
    A permutation of a palindrome, has no more than one character that is odd, so count frequency of all characters
    occurring in input string, keeping track of odd count as you go. If odd count is 0 or 1 afterwards, return true.
    Time: O(n). Need to look at each character once.
    Space: O(1). Solution requires a dictionary of size n if all characters are unique, but since there are only 26
    letters in the alphabet, there will be at most 26 elements in dictionary (assuming case insensitivity)
    """
    odd_count = 0
    char_counts = {}
    for c in str.lower().replace(' ', ''):

        # count chars
        if c in char_counts:
            char_counts[c] += 1
        else:
            char_counts[c] = 1

        # count odds
        if char_counts[c] % 2 == 0:
            odd_count -= 1
        else:
            odd_count += 1

    return True if odd_count < 2 else False

def is_palindrome_perm2(str):
    """
    Solution 2:
    Little bit cleaner and negligibly slower version by initializing character frequencies to 0.
    Time: O(n)
    Space: O(1)
    """
    import string

    odd_count = 0
    char_counts = {letter:0 for letter in string.ascii_lowercase}
    parsed_str = str.lower().replace(' ', '')

    for c in parsed_str:

        # count chars
        char_counts[c] += 1

        # count odds
        if char_counts[c] % 2 == 0:
            odd_count -= 1
        else:
            odd_count += 1

    return True if odd_count < 2 else False

def is_palindrome_perm3(str):
    """
    Solution 3:
    Faster, slightly more complicated solution using bitwise operation.
    Time: O(n)
    Space: O(1)
    """
    #tbd

"""
test
"""
def test_is_palindrome_perm2():
    assert is_palindrome_perm('a') == True
    assert is_palindrome_perm('ab a') == True
    assert is_palindrome_perm('aa ') == True
    assert is_palindrome_perm(' abab c') == True
    assert is_palindrome_perm('ab ab ab ab c dd') == True
    assert is_palindrome_perm('abcd') == False
    assert is_palindrome_perm('ab') == False
