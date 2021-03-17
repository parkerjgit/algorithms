/*
Given a list of words, each word consists of English lowercase letters.

Let's say word1 is a predecessor of word2 if and only if we can add exactly one letter anywhere in word1 to make it equal to word2.  For example, "abc" is a predecessor of "abac".

A word chain is a sequence of words [word_1, word_2, ..., word_k] with k >= 1, where word_1 is a predecessor of word_2, word_2 is a predecessor of word_3, and so on.

Return the longest possible length of a word chain with words chosen from the given list of words.

source: Longest String Chain (leetcode) - https://leetcode.com/problems/longest-string-chain/
*/

/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function(words) {
  words = words.sort((a,b)=>a.length - b.length);
  let longest = Object.create(null); 
  words.forEach(word => longest[word] = 1);

  for (let word of words) {
    for (let i=0; i<word.length; i++) {

      // get all possible previous words
      let prev = word.slice(0,i) + word.slice(i+1);

      // for those that are in word set, update longest chain from word so far
      if (prev in longest) {
        longest[word] = Math.max(longest[word], longest[prev] + 1);
      }
    }
  }
  return Math.max(...Object.values(longest));
};
