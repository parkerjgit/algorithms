/*
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

source: Group Anagrams (lc 49) - https://leetcode.com/problems/group-anagrams/
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 *
 * Anagrams have same sorted value, so map sorted strings to buckets
 *
 * Time: O(NK \log K), where N is the length of strs, and K is the maximum
 * length of a string in strs. The outer loop has complexity O(N) as we
 * iterate through each string. Then, we sort each string in O(K \log K) time
 * Space: O(NK), the total information content stored in ans.
 */
var groupAnagrams = function(strs) {
    let buckets = new Map();

    for (let s of strs) {
        let key = s.split('').sort().join('');

        if (buckets.has(key)) {
            buckets.get(key).push(s);
        } else {
            buckets.set(key, [s]);
        }
    }

    let res = [];
    for (let group of buckets.values()) {
        res.push(group);
    }

    return res;
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 *
 * Anagrams have same char counts, so map char count to bucket
 */
var groupAnagrams = function(strs) {
  let buckets = new Map();

  for (let s of strs) {
      let key = counter(s);

      if (buckets.has(key)) {
          buckets.get(key).push(s);
      } else {
          buckets.set(key, [s]);
      }
  }

  let res = [];
  for (let group of buckets.values()) {
      res.push(group);
  }

  return res;
};

function counter(s) {
  let res = Array(26).fill(0);
  let hashf = (c) => c.charCodeAt(0) - 97;
  for (let c of s) {
      res[hashf(c)]++;
  }
  return JSON.stringify(res);
}
