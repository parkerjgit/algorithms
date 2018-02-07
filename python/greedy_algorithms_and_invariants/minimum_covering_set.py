"""
The Interval Covering Problem (EPI 17.3)

motivation:
Foreman needs to visit floor to check on tasks. With each visit he can check
on those tasks taking place. What is min number of visits to check all tasks,
given the start/end time intervals of each task?

question:
You are given a set of closed intervals. Design an efficient algorithm for
finding the size of minimum set of numbers that "covers" all the intervals.

source:
Aziz, Adnan, Tsung-Hsien Lee, and Amit Prakash., Elements of programming
interviews in Python: the insiders' guide (2017) 264.
"""


def min_covering_set_size(intervals):
    """Find size of minimum set of points in time that covers all intervals.

    Args:
        intervals (list): list of tuples representing valid time intervals as
        pairs of real numbers representing the start and end time of an interval.

    Returns:
        int: returns the size of minimum "covering set", defined as set of numbers
        that is bound inclusively by all intervals.

    Warning:
        Modifies list intervals by sorting in-place

    Note:
        Time: O(nlogn) - linear iteration dominated by superlinear pre-sort
        Space: O(1) - In place
    """

    def _min_covering_set_size(intervals):

        # try to sort intervals by end time
        intervals.sort(key=lambda x: x[1])

        last_end, size = 0, 0
        for i in intervals:

            # validate time interval i
            assert len(i) == 2
            assert 0 <= i[0] <= i[1]

            start = i[0]
            end = i[1]
            if start > last_end:

                # last_end will not cover any more intervals.
                last_end = end
                size += 1

        return size

    try:
        size = _min_covering_set_size(intervals)
    except (AttributeError, TypeError) as e:
        print("input not valid: " + str(e))
    except AssertionError:
        print("time interval " + str(i) + " not valid")
    else:
        return size

if __name__ == '__main__':
    assert min_covering_set_size([(1,2),(2,3),(3,4),(2,3),(3,4),(4,5)]) == 2