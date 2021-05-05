/*
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
the same word in the dictionary may be reused multiple times in the segmentation.

Solution:

https://leetcode.com/problems/word-break/solution/

source: Word Break (lc 139) - https://leetcode.com/problems/word-break/
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let dict = new Set(wordDict);
    let memo = [...Array(s.length)].map(_=>new Map());

    function canBreak(i, path, memo) {
        if (i === s.length) return (path === '');
        if (memo[i].has(path)) return memo[i].get(path);

        let result = (dict.has(path+s[i]))
            ? canBreak(i+1, path+s[i], memo) || canBreak(i+1, '', memo)
            : canBreak(i+1, path+s[i], memo);

        memo[i].set(path, result);
        return result;
    }

    return canBreak(0, '', memo);
};

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const dict = new Set(wordDict)
  const memo = new Map();
  return canBreak(s, dict, memo);
};

function canBreak(s, dict, memo) {
  if (dict.has(s)) return true;
  if (memo.has(s)) return memo.get(s);

  for (let i = 1; i < s.length; i++) {
      if (dict.has(s.slice(0, i)) && canBreak(s.slice(i), dict, memo)) {
          memo.set(s, true);
          return true;
      }
  }
  memo.set(s, false);
  return false;
}

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = (s, wordDict) => {
  const dict = new Set(wordDict)
  const dp = Array(s.length + 1).fill(false);

  dp[0] = true;
  for (let right = 1; right <= s.length; right++) {
      for (let left = 0; left < right; left++) {
          if (dp[left] && dict.has(s.slice(left, right))) {
              dp[right] = true;
              break;
          }
      }
  }
  return dp[s.length];
};
