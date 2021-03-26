/*


source:
*/

var minSumOfLengths = function(arr, target) {
  const memo = []; // i -> len of shortest single subarray upto index i
  let left = 0, right = 0, sum = 0;
  let best = Infinity; // total length of two shortest subarrays

  while(right < arr.length) {
      sum += arr[right];

      while(sum > target) {
        sum -= arr[left];
        left++
      }

      //              l   r
      // ---- **** -- ***** --
      let currentWindow = right - left + 1;
      let bestNonOverlapping = memo[left-1] || Infinity; // len of best subarray so far not overlapping with current window.
      let bestPrevious = memo[right-1] || Infinity // len of best subarray so far possibly overlapping with current window.

      if(sum === target) {
        best = Math.min(best, bestNonOverlapping + currentWindow);
        memo[right] = Math.min(bestPrevious, currentWindow);
      } else {
        memo[right] = bestPrevious;
      }

      right++
  }
  return best === Infinity ? -1 : best;
};
