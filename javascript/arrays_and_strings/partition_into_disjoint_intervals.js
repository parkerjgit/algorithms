/*
Given an array A, partition it into two (contiguous) subarrays left and right so that:

Every element in left is less than or equal to every element in right.
left and right are non-empty.
left has the smallest possible size.
Return the length of left after such a partitioning.  It is guaranteed that such a partitioning exists.

Constraints:

2 <= A.length <= 30000
0 <= A[i] <= 10^6
It is guaranteed there is at least one way to partition A as described.

source: Partition Array into Disjoint Intervals (lc 915) - https://leetcode.com/problems/partition-array-into-disjoint-intervals/
*/

/**
 * @param {number[]} A
 * @return {number}
 *
 * Time: O(n)
 * Space: O(1)
 */
var partitionDisjoint = function(A) {
  let leftMax = A[0],
      maxSoFar = A[0],
      right = 1; // start of right partition (is also the number of left elements)

  for (let i = 1; i < A.length; i++) {
      maxSoFar = Math.max(maxSoFar, A[i]);
      if (A[i] < leftMax) { // if el < left max, left partition must include it
          right = i+1;
          leftMax = maxSoFar;
      }
  }

  return right;
};
