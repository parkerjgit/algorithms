/*
problem:
Given a string, find the length of the longest substring without repeating characters.

e.g.

Given "abcabcbb", the answer is "abc", which the length is 3.
Given "bbbbb", the answer is "b", with the length of 1.
Given "pwwkew", the answer is "wke", with the length of 3.

source:
https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
*/

function longestSubstring(str) {
  var longSoFar = '';
  var candidate = '';
  var j = 0;
  while (j < str.length - 1) {
    if (candidate.includes(str[j])) {
      longSoFar = (candidate.length > longSoFar.length) ? candidate : longSoFar;
      candidate = '';
    } else {
      candidate += str[j];
    }
    j++;
  }
  return longSoFar;
}

function longestSubstring2(str) {

  var [i,j] = [0,1];
  var lsf = [i,j]; // indices of longest so far

  const repeating = (i,j) => str.slice(i,j).includes(str[j]);
  const lsfLength = () => lsf.reduce((i,j)=>j-i)

  while (j < str.length) {
    if (repeating(i,j)) {
      if (j-i > lsfLength()) {
        lsf = [i, j];
      }
      i++; // repeating, so shrink window from back
    } else {
      j++; // not repeating, so grow window
    }
  }
  return str.slice(...lsf);
}

//console.log(longestSubstring2('abcabcbb'));

// describe('longest substring', function() {
//   it('returns first longest non-repeating substring', function() {
//     expect(longestSubstring2('abaeaf')).toEqual('ab');
//   });
// });

