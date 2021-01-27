def min_delete_sum(s1, s2):

    i,j = 0, len(s1)-1
    m,n = 0, len(s2)-1
    cost = 0

    def _update(cost, i, j, m, n):

        c1,c2 = 0,0
        it = i
        mt = m
        while s1[i] != s2[mt] and mt < n:
            c1 += ord(s2[mt])
            mt += 1
        while s1[it] != s2[m] and it < j:
            c2 += ord(s1[it])
            it += 1
        it += 1
        mt += 1
        if c1 < c2:
            res = (c1, it, j, m, n)
        else:
            res = (c2, i, j, mt, n)
        return res

    while i < j and m < n:
        if s1[i] == s2[m]:
            i += 1
            m += 1
        else:
            cost, i, j, m, n = _update(cost, i, j, m, n)

class Solution(object):
    def maxProfit(self, prices, fee):
        """
        :type prices: List[int]
        :type fee: int
        :rtype: int
        """
        max_sell, max_buy = 0, float('-inf')
        sell, buy = 0, 0
        for price in prices:
            sell = max_buy + price - fee
            buy = max_sell - price
            max_sell = max(max_sell, sell)
            max_buy = max(max_buy, buy)
        return max_sell

class Solution(object):
    def minimumDeleteSum(self, s1, s2):
        """
        :type s1: str
        :type s2: str
        :rtype: int
        """
        dp = [[sys.maxint for _ in range(len(s2) + 1)] for _ in range(len(s1) + 1)]
        dp[0][0] = 0
        for i in range(1, len(s1) + 1):
            dp[i][0] = dp[i - 1][0] + ord(s1[i - 1])
        for j in range(1, len(s2) + 1):
            dp[0][j] = dp[0][j - 1] + ord(s2[j - 1])

        for i in range(1, len(s1) + 1):
            for j in range(1, len(s2) + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = min(dp[i - 1][j] + ord(s1[i - 1]), dp[i][j - 1] + ord(s2[j - 1]))

        return dp[len(s1)][len(s2)]

