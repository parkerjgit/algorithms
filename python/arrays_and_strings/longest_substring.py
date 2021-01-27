"""
problem:
Given a string, find the length of the longest substring without repeating characters.

e.g.

Given "abcabcbb", the answer is "abc", which the length is 3.
Given "bbbbb", the answer is "b", with the length of 1.
Given "pwwkew", the answer is "wke", with the length of 3.

source:
https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
"""

class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """

        window = set()          # a sliding window
        first, last = 0, -1     # first/last char (inclusive) in window
        length = 0              # length of window

        for char in s:

            # shrink window while repeating
            while char in window:
                window.remove(s[first])
                first += 1

            # expand window by one
            window.add(char)
            last += 1

            # update length of longest substring so far
            length = max(length, last - first + 1)

        return length

if __name__ == '__main__':
    s = Solution()
    print(s.lengthOfLongestSubstring('abcabcbb'))