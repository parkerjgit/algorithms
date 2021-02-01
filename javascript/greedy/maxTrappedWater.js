/*
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water. Notice that you may not slant the container.

Constraints:

n == height.length
2 <= n <= 3 * 104
0 <= height[i] <= 3 * 104

source: Container With Most Water (leetcode #11) - https://leetcode.com/problems/container-with-most-water/
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxTrappedWater = function(height) {
  let [maxArea, left, right] = [0, 0, height.length - 1];
  while (left < right) {
      maxArea = Math.max(maxArea, (right - left) * Math.min(height[left], height[right]));
      if (height[left] < height[right]) {
          left++;
      } else { // height[right] < height[left]
          right--;
      }
  }
  return maxArea;
};

