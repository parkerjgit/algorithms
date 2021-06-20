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

function longestSubstring(str) {

  var [left, right] = [0,1];
  var longest = [left, right];    // indices of longest so far (excluding right!)

  const isRepeating = (left, right) => str.slice(left, right).includes(str[right]);

  while (right < str.length) { 

    if (isRepeating(left, right)) {
      longest = Math.max(right - left, longest[1] - longest[0])
      left++;                     // repeating, shrink slinky

    } else {
      right++;                    // not repeating, grow slinky
    }
  }
  return str.slice(...longest);   // exclude right
}

//console.log(longestSubstring2('abcabcbb'));

// describe('longest substring', function() {
//   it('returns first longest non-repeating substring', function() {
//     expect(longestSubstring2('abaeaf')).toEqual('ab');
//   });
// });

