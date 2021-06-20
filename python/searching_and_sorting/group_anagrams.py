"""
question:
Write a method to sort an array of strings so that all the anagrams are next to each other

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 396.
"""
import string

def group_anagrams(str_arr):
    """
    Solution:
    Merge Sort strings in array by comparing their character-sorted forms. This has the effect of placing anagrams
    next to each other b/c two anagrams with their characters in sorted order are of equal.

    Time: O(nlogn) - by repeated halving the number of elements in array, we perform logn sets of operations, each
    involving approx n operations. Modified comparator is expensive but still considered a constant time operation
    assuming strings in array are real words, i.e. limited in character length to some constant c.

    Notes:
    CTCI pointed out a better solution: Load all strings into hash table with sorted string as the key, and a list
    of anagrams as the value. So, for each string we sort it to get the key and append it to the value array.
    Then, we iterate the hash map and build new list of strings. strings will be unsorted due to unordered nature
    of hashing, but anagrams will be next to each other. This is a O(n) linear time solution!
    """

    def merge(arr, lo, mid, hi):
        """ merge sorted elements lo-to-mid with elements mid-to-hi from input array """

        # create temp arrays
        left = arr[lo: mid+1]
        right = arr[mid+1: hi+1]

        # init vars to index arrays
        i,j,k = 0,0,lo

        # merge temp arrays back into input array
        while i < len(left) and j < len(right):

            # compare sorted strings
            if "".join(sorted(left(i))) <= "".join(sorted(right(j))):
                arr[k] = left(i)
                i += 1
            else:
                arr[k] = right(j)
                j += 1
            k += 1

        # copy remaining left elements if any
        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1

        # copy remaining right elements if any
        while j < len(right):
            arr[k] = right[j]
            i += 1
            k += 1

    def sort(arr, lo, hi):
        """ perform merge sort """

        # base case: one item
        if hi <= lo:
            # one item, so its already sorted
            return

        # find mid pt
        mid = (hi - lo) // 2

        # sort left half
        sort(arr, lo, mid)

        # sort right half
        sort(arr, mid+1, hi)

        # merge left and right halves
        merge(arr, lo, mid, hi)

    sort(str_arr, 0, len(str_arr) - 1)

"""
test - tbd...
"""