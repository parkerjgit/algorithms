"""
question:
A child is running up a staircase with n steps, and can hope either 1 step,
2 steps, or 3 steps at a time. Implement a method to count how many possible
ways the child can run up the stairs.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 342.
"""


def triple_step(n):
    """
    solution 1:
    ways of reaching the final nth step is sum of the ways of reaching the three steps preceding n.
    This solution is exponential O(3^N) b/c there are three recursive calls at each of n steps,
    and each recursive call stack is ternary tree, in which number of recursive calls are tripled
    at each level.
    """

    # base cases
    if n < 0: return 0
    if n == 0: return 1

    # recurse
    return triple_step(n - 1) + triple_step(n - 2) + triple_step(n - 3)


map = dict()
def triple_step_2(n):
    """
    solution 2:
    Using dynamic programming memoization, we cache return value of redundant function calls.
    This solution is linear O(n) b/c there are now n calls + lots of constant time lookups.
    """

    # base cases
    if n < 0: return 0
    if n == 0: return 1

    # lookup / recurse
    if n in map:
        return map[n]
    else:
        map[n] = triple_step_2(n - 1) + triple_step_2(n - 2) + triple_step_2(n - 3)
        return map[n]

def triple_step_3(n):
    """
    solution 3:
    For any step, if not the first or last step, you can either step on it or over it (ie 0 or 1),
    so recurse for both possibilities from next step to last step, unless skipped previous two steps,
    in which case you must step on it. Of course if on first or last step, you must also step on it.
    Return 1 when you reach last step. This solution is exponential O(2^n) and marginally faster
    than solution 1 b/c making 2 instead of 3 recursive calls for each step.
    """

    def do(j, k, next, last):

        # base cases for first and last step
        if next == last:
            return 1
        if next == 0:
            return do(0, 1, next + 1, last)

        # recurse for other steps based on prev steps, j and k
        return {
            (0,0): do(0, 1, next + 1, last),
            (0,1): do(1, 0, next + 1, last) + do(1, 1, next + 1, last),
            (1,0): do(0, 0, next + 1, last) + do(0, 1, next + 1, last),
            (1,1): do(1, 0, next + 1, last) + do(1, 1, next + 1, last)}[(j,k)]

    return do(None, None, 0, n)

def test_tripleStep():
    assert triple_step(0) == 1
    assert triple_step(1) == 1
    assert triple_step(2) == 2
    assert triple_step(3) == 4
    assert triple_step(4) == 7
    assert triple_step(5) == 13

def test_tripleStep_2():
    assert triple_step_2(0) == 1
    assert triple_step_2(1) == 1
    assert triple_step_2(2) == 2
    assert triple_step_2(3) == 4
    assert triple_step_2(4) == 7
    assert triple_step_2(5) == 13

def test_tripleStep_3():
    assert triple_step_3(0) == 1
    assert triple_step_3(1) == 1
    assert triple_step_3(2) == 2
    assert triple_step_3(3) == 4
    assert triple_step_3(4) == 7
    assert triple_step_3(5) == 13