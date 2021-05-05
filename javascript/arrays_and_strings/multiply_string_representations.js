/*
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

source: Multiply Strings (lc 43) - https://leetcode.com/problems/multiply-strings/
*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 *
 * Time: O(n)
 * Space: O(n)
 */
 var multiply = function(a, b) {
  if (a === '0' || b === '0') return '0';

  // length of product is the sum of lengths of factors (or sum - 1)
  let res = Array(a.length + b.length).fill(0);

  for (let i = a.length - 1; i >= 0 ; i--) {
      for (let j = b.length - 1; j >= 0; j--) {

          // calc partial product
          let carry = res[i+j+1];
          let partial = a[i] * b[j] + carry;

          // update result
          res[i+j+1] = partial % 10;
          res[i+j] += Math.floor(partial/10);
      }
  }

  return (res[0] === 0)
      ? res.slice(1).join('') // leading zero
      : res.join('')
};
