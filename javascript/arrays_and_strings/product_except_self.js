/*

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

Follow up:

Could you solve it in O(n) time complexity and without using division?
Could you solve it with O(1) constant space complexity? (The output array does not count as extra space for space complexity analysis.)

source: Product of Array Except Self (lc 238) - https://leetcode.com/problems/product-of-array-except-self/
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 *
 * Time: O(n)
 * Space: O(1)
 */
var productExceptSelf = function(nums) {
  let n = nums.length;

  // compute product of elements to left of i
  let left = [1];
  for (let i = 1; i < n; i++) {
      left[i] = left[i-1] * nums[i-1];
  }

  // maintain product of elements right of i
  // multiply left of i by right of i and overright result to left
  let right = 1;
  for (let i = n-1; i >= 0; i--) {
      left[i] = left[i] * right;
      right = right * nums[i];
  }

  return left;
};
