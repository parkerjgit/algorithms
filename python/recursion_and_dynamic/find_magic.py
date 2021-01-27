"""
question:
A magic index in an array A [1... n-1] is defined to be an index such that A[i] = i. Given a sorted
array of distinct integers, write a method to find a magic index, if one exists, in array A.

follow up:
What  if  the values are  not  distinct?

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 346.
"""

def find_magic(arr):
    """
    Solution:
    For given sorted distinct-valued array, the following conditions must be met for magic value to possibly exist:
    1. the lowest value must be less than or equal to the lowest index.
    2. the highest value must be greater than or equal to the highest index.
    If those conditions are met AND there is only one value, then it must be the magic index. Otherwise, recurse
    on left or right half of array if middle value is not magic.

    time: O(logn) - we are essentially searching a binary tree of depth log(n).
    space: O(1) - by passing input array down recursion stack search uses constant aux space
    """

    def find(arr, lo, hi):

        # base cases
        if arr[lo] > lo:
            return None
        if arr[hi] < hi:
            return None
        if lo == hi:
            return lo

        # must be more than 1 item, so find middle
        mid = lo + ((hi - lo) // 2)

        # recurse left or right if not mid
        if arr[mid] == mid:
            return mid
        elif arr[mid] > mid:
            return find(arr, lo, mid-1)
        else:
            return find(arr, mid+1, hi)

    return find(arr, 0, len(arr)-1)

"""
test
"""
if __name__ == '__main__':
    assert find_magic([0, 2, 3, 5, 6, 7, 9]) == 0
    assert find_magic([-1, 1, 3, 5, 6, 7, 9]) == 1
    assert find_magic([-3, -1, 2, 5, 6, 7, 9]) == 2
    assert find_magic([-3, -2, -1, 0, 3, 4, 6]) == 6