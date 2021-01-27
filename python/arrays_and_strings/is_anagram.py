"""
question:
Given two strings, write a function to check if strings are anagrams of each other. Anagrams are a strings that contains
the same characters in different order.
"""

def is_anagram(s1: str, s2: str) -> bool:
    """
    solution:
    check if two strings are anagrams. First make sure they are same length. Then count frequency of each character
    in first string and decrement count of each character in second string. If count of any character is zero before
    decrement, then its not an anagram. Store counts in hash map (dictionary) for fast lookup. Can initial a dictionary
    with entries for each letter in alphabet in constant time or add entry for first occurrence of each character in
    first string, and test for inclusion before decrementing count for each character in second string. Choose former
    b/c less verbose.

    Time: O(n)
    Space: O(1) - because finite number of letters in alphabet.
    """

    # if diff length, not anagrams
    if len(s1) != len(s2):
        return False

    # initialize dictionary with one entry for each letter of alphabet
    char_counts = {x: 0 for x in string.ascii_lowercase}

    # increment char counts for each char in s1
    for char in s1:
        char_counts[char.lower()] += 1

    # decrement char counts of each char in s2
    for char in s2:

        if char_counts[char.lower()] <= 0:
            # count is zero before decrement, so not anagrams
            return False
        else:
            char_counts[char.lower()] -= 1

    # they are anagrams!
    return True
