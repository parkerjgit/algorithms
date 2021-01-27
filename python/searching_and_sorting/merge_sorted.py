"""
question:
You are given two sorted arrays A and B, where A has a large enough buffer at the end to hold B. Write a method to
merge B into A in sorted order.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming
Questions and Solutions 6th Edition (2015) 396.
Aziz, Adnan, Tsung-Hsien Lee, and Amit Prakash., Elements of programming
interviews in Python: the insiders' guide (2017) 264.
"""

def merge_sorted(A, B):
    """
    Solution:
    Step thru A back-to-front copying largest element from A or B yet to be (re)sorted into current slot for each step.
    Time: O(n)
    Space: O(1)
    """

    try:
        # get id of last valid elements
        i = get_id_of_last(A)
        j = get_id_of_last(B)

    except IndexError:
        print("invalid input")

    else:
        merge_sorted_helper(A, B, i, j)


def merge_sorted_helper(A, B, last_in_A, last_in_B):

    i = last_in_A
    j = last_in_B
    for k in reversed(range(i + j + 2)):
        if j < 0 or A[i] >= B[j]:
            A[k] = A[i]
            i -= 1
        else:  # i < 0 or B[j] > A[i]:
            A[k] = B[j]
            j -= 1


def get_id_of_last(Arr):
    """helper for getting id of last valid element in array"""

    # check for empty array
    if not Arr:
        raise IndexError

    # check for full array
    if Arr[-1]:
        return len(Arr) - 1

    # otherwise find last valid
    i = -1
    while Arr[i+1]:
        i += 1
    return i


if __name__ == '__main__':
    list_a = [1,3,5,6,7,None,None,None,None,None]
    list_b = [2,4,6,None]
    list_c = []
    merge_sorted(list_a, list_b) == [1,2,3,4,5,6,6,7,None,None]
    print(list_a)