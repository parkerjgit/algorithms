/*
You are given a string s and an array of strings words of the same length. Return all starting indices of substring(s) in s that is a concatenation of each word in words exactly once, in any order, and without any intervening characters.

Constraints:

1 <= s.length <= 104
s consists of lower-case English letters.
1 <= words.length <= 5000
1 <= words[i].length <= 30
words[i] consists of lower-case English letters.

source: Substring with Concatenation of All Words (leetcode) - https://leetcode.com/problems/substring-with-concatenation-of-all-words/
*/

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstrings = function(s, words) {

  const wordSize = words[0].length,
        strSize = words.length,
        substringSize = strSize * wordSize,
        wordIds = [...Array(substringSize).keys()].filter(x => x % wordSize == 0),
        res = [];

  // hash to keep track of word counts
  const word_counts = words.reduce((acc,word) => {
      acc[word] = (typeof acc[word] !== "undefined") ? acc[word] + 1 : 1;
      return acc;
  }, {})

  // slide window of size substringSize over s
  for (let i = 0; i <= s.length - substringSize; i++ ) {

      // extract candidate
      let candidate = s.slice(i, i+substringSize);
      let tempWordCounts = Object.assign({}, word_counts);

      wordIds.every(idx => {

          // extract slice of candidate
          let candidateSlice = candidate.slice(idx, idx + wordSize);

          // check for word
          if (tempWordCounts[candidateSlice]) {
              tempWordCounts[candidateSlice] -= 1;
              return true; // so far so good!
          } else {
              return false; // break
          }

      })

      // did substring contain every word?
      if (Object.values(tempWordCounts).reduce((acc,val) => acc + val, 0) == 0) {
          res.push(i);
      }
  }

  return res;
};

// test
describe('findSubstrings', () => {
  it('returns all starting indices of substring(s) in s that are concatenations of all words', () => {
    expect(findSubstrings("barfoothefoobarman", ["foo","bar"])).toEqual([0,9]);
    expect(findSubstrings("wordgoodgoodgoodbestword", ["word","good","best","word"])).toEqual([]);
    expect(findSubstrings("barfoofoobarthefoobarman", ["bar","foo","the"])).toEqual([6,9,12]);
  })
})
