/*
Given an array of integers arr and an integer target. You have to find two non-overlapping sub-arrays of arr each with sum equal target. There can be multiple answers so you have to find an answer where the sum of the lengths of the two sub-arrays is minimum. Return the minimum sum of the lengths of the two required sub-arrays, or return -1 if you cannot find such two sub-arrays.

Constraints:

1 <= arr.length <= 10^5
1 <= arr[i] <= 1000
1 <= target <= 10^8

source: Find Two Non-overlapping Sub-arrays Each With Target Sum (lc 1477) - https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/
*/

// sliding window. O(n)/O(n)
var minSumOfLengths = function(arr, target) {
  let left = 0, right = 0, sum = 0;
  let best = Infinity; // total length of two shortest subarrays
  let bestSingle = []; // i -> len of shortest single subarray upto index i

  while(right < arr.length) {
      sum += arr[right];

      while(sum > target) {
        sum -= arr[left];
        left++
      }

      //              l   r
      // ---- **** -- ***** --
      let currentWindow = right - left + 1;
      let bestNonOverlapping = bestSingle[left-1] || Infinity; // len of best subarray so far not overlapping with (ie left of) current window.
      let bestPrevious = bestSingle[right-1] || Infinity // len of best subarray so far possibly overlapping with current window.

      if(sum === target) {
        best = Math.min(best, bestNonOverlapping + currentWindow);
        bestSingle[right] = Math.min(bestPrevious, currentWindow);
      } else {
        bestSingle[right] = bestPrevious;
      }

      right++
  }
  return best === Infinity ? -1 : best;
};
