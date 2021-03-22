/*


source:
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  let totalSum = nums.reduce((a,b)=>a+b,0);

  if (totalSum % 2 !== 0) return false;

  let memo = [...Array(nums.length)].map(row => []);

  let [success, subset] = subsetSum(nums, 0, totalSum / 2)

  return success;

  function subsetSum(arr, i, target) {

      if (target == 0)
          return [true, []];
      if (target < 0)
          return [false, null];
      if (i > arr.length - 1)
          return [false, null];

      if (memo[i][target] != undefined)
          return memo[i][target];

      // try including/excluding ith element
      let include = subsetSum(arr, i+1, target - arr[i]);
      let exclude = subsetSum(arr, i+1, target);

      if (include[0]) {
          memo[i][target] = [true, [...include[1], arr[i]]];
      } else if (exclude[0]) {
          memo[i][target] = [true, exclude[1]];
      } else {
          memo[i][target] = [false, null];
      }

      return memo[i][target];
  }
};

// first attempt (TLE) *********************************************************

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {

  // validate input... 

  return _canPartition(nums, 0, 0, 0);
};

function _canPartition(nums, aState, bState, i, memo=[]) {

  // base case
  if (i == nums.length)
      return getSum(nums, aState) == getSum(nums, bState);

  if (!memo[aState]) {
      memo[aState] = [];
      memo[aState][bState] = [];
  } else if (!memo[aState][bState]) {
      memo[aState][bState] = [];
  } else if (memo[aState][bState][i]) {
      return memo[aState][bState][i];
  }

  // try each include/exclude
  let canAddToA = _canPartition(nums, setBit(aState,i), bState, i+1);
  let canAddToB = _canPartition(nums, aState, setBit(bState,i), i+1);

  memo[aState][bState][i] = canAddToA || canAddToB;

  return memo[aState][bState][i];
}

const getBit = (num, i) => num & (1 << i);
const setBit = (num, i) => num | (1 << i);
const getSum = (arr, mask) => { // -> sum of items corresp. to bits.
  let run = 0;
  let i = arr.length - 1;
  while (mask > 0) {
      if (mask & 1) {
          run += arr[i]
      }
      mask >> 1;
      i--;
  }
}
