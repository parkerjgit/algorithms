"""
question:
You have to create a function that takes a positive integer number and returns the next bigger number formed by the
same digits. If no bigger number can be composed using those digits, return -1.

source:
Next bigger number with the same digits, Codewars Kata by user GiacomoSorbi,
accessed 6/15/2018 at https://www.codewars.com/kata/next-bigger-number-with-the-same-digits/train/python/5b24862cb6989df52b000028
"""


def next_bigger(n):
    """
    solution:
    Step thru digits back to front until u find digit smaller than prev at i. Step thru front to back, from i, until
    find smallest digit bigger than dig at i at position j. Swap digits at i and j. Solution is a array created by
    concat digits 0 to i with remaining digits (i+1 to n-1) reversed.

    e.g.
                  i
    [ 1 2 9 2 5 3 2 1 ]
            | i
    [ 1 2 9 | 2 5 3 2 1 ]
                  j |
    [ 1 2 9 | 2 5 3 | 2 1 ]
            | < - > |
    [ 1 2 9 | 3 5 2 | 2 1 ]
         ...i               i+1...
    [ 1 2 9 3 ] + reversed( [ 5 2 2 1 ] )

    [ 1 2 9 3 1 2 2 5 ]

    Time: O(n) - 3n upper bound for case where we swap first and last digits.
    Space: O(n) - could be in-place by reversing digits in-place (if passed digit array repr. instead of number)
    """

    a = list(map(int,str(n)))

    # digits in reverse sorted order can't be reordered to make larger number.
    if list(reversed(a)) == sorted(a):
        return -1

    # if not rev. sorted, solution is guaranteed.
    for i in range(len(a)-2, 0, -1):

        if a[i] < a[i+1]:

            for j in range(i+1, len(a), 1):

                if a[j] <= a[i]:
                    a[i],a[j-1] = a[j-1],a[i]
                    break

                if j == len(a) - 1:
                    a[i],a[j] = a[j],a[i]
                    break

            a = a[:i + 1] + list(reversed((a[i + 1:])))
            return int(''.join([str(d) for d in a]))
