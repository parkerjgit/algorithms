/*
Given a string, your task is to count how many palindromic substrings in this string. The substrings with 
different start indexes or end indexes are counted as different substrings even they consist of same characters.

Example 1:

Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
 
Example 2:

Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

source: Palindromic Substrings (leetCode 647) - https://leetcode.com/problems/palindromic-substrings/
*/

/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubstrings = function(s) {
    
    let cnt = s.length;
    
    const grow = (l, r) => {
        if (l >= 0 && s[l] === s[r]) {
            cnt++;
            grow(l-1, r+1);
        }
    }
    
    for (let i = 0; i < s.length - 1; i++) {
        grow(i-1, i+1);
        grow(i, i+1);
    }
    
    return cnt
};

// Test

describe('countPalindromicSubstrings', () => {
    it('returns number of palindromic substrings in a string (including duplicates)', () => {
        expect(countPalindromicSubstrings('a')).toEqual(1);
        expect(countPalindromicSubstrings('aaaaaaaaaaaaaaaaaaa')).toEqual(190);
        expect(countPalindromicSubstrings('aasdffddsgfdfgadffffdsdfghhsdfgdfasasdfdsddddsdsd')).toEqual(82);
    })
})