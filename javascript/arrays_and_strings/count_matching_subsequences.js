/*
Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".

source: https://leetcode.com/problems/number-of-matching-subsequences/
*/

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function(s, words) {
  let count = 0;

  // maps char -> array index
  const hashfn = (ch) => ch.charCodeAt(0) - 'a'.charCodeAt(0);

  // group words by first letter, eg. [0: ['ab', 'abc'], 1: ['b', 'bag'], ...]
  let buckets = [...Array(26)].map(_ => new Array());
  for (let word of words) {
      buckets[hashfn(word[0])].push(word);
  }

  for (let ch of s) {
      let bucketCopy = [...buckets[hashfn(ch)]];

      // clear bucket
      buckets[hashfn(ch)] = [];

      // process words
      for (let word of bucketCopy) {
          if (word.length == 1) {
              // found one!
              count++;
          } else {
              // move rest of word to approp. bucket
              let [first, ...rest] = [word[1], word.slice(1)];
              buckets[hashfn(first)].push(rest)
          }
      }
  }

  return count;
};
