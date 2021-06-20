"""
question:
Given endless supply of coins with the specified values, as well as an integer amount we wish to make change for,
calculate the minimum number of coins required.

source:
Fullstack Academy interview question.
"""


def coin_change(coins, cost):
    """
    solution:
    Call helper function recursively to calculate all possible combinations by passing coin count (cnt), current coin
    index (cid), and remaining balance (rest) down the call stack until no balance remains, or failure condition is
    met. Optimize redundant call stack by caching solution to subproblems.

    time: O(n) ~mn upper bound for m coin denominations and an amount n to change.
    space: O(n) - for call stack. Could be further optimized with iterative solution.
    """

    memo = {}

    def _ch(cid, rst, cnt):

        # stop branching. failed to make change.
        if rst < 0 or cid > len(coins) - 1:
            return float('inf')

        # stop branching. found min count for this branch.
        if rst % coins[cid] == 0:
            return cnt + (rst // coins[cid])

        # try taking 1 more and no more of this coin.
        if rst % coins[cid] > 0:

            take1 = (cid, rst - coins[cid], cnt + 1)
            take0 = (cid + 1, rst, cnt)

            memo[take1] = memo[take1] if take1 in memo else _ch(*take1)
            memo[take0] = memo[take0] if take0 in memo else _ch(*take0)

            return min(memo[take1], memo[take0])

    return _ch(0, cost, 0)