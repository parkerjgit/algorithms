/*
A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The answer is guaranteed to fit in a 32-bit integer.

Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).

source: Decode Ways (lc 91) - https://leetcode.com/problems/decode-ways/
*/

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  return count(s,0);
};

/**
 * @param {string} str
 * @param {integer} i
 * @return {number}
 */
var count = function(str, i, memo=[]) {
  if (str[i] == "0") return 0;
  if (i >= str.length - 1) return 1;
  if (memo[i]) return memo[i];

  // 1. always take 1, b/c base case took care of "0" case
  let res = count(str, i+1, memo);

  // 2. try to take 2 if next two digs can be decoded (ie <= 26)
  if (parseInt(str[i] + str[i+1]) <= 26) {
      res += count(str, i+2, memo);
  }

  memo[i] = res;
  return res;
}

// see iterative solution - https://leetcode.com/problems/decode-ways/solution/
