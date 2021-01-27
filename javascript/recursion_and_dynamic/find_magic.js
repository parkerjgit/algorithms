/*
question:
A magic index in an array A [1... n-1] is defined to be an index such that A[i] = i. Given a sorted
array of distinct integers, write a method to find a magic index, if one exists, in array A.

follow up:
What  if  the values are  not  distinct?

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 346.
*/

/*
Solution:
For given sorted distinct-valued array, the following conditions must be met for magic value to possibly exist:
1. the lowest value must be less than or equal to the lowest index.
2. the highest value must be greater than or equal to the highest index.
If those conditions are met AND there is only one value, then it must be the magic index. Otherwise, recurse
on left or right half of array if middle value is not magic.

time: O(logn) - we are essentially searching a binary tree of depth log(n).
space: O(1) - by passing input array down recursion stack search uses constant aux space
*/
function findMagic(arr) {

	return (function _find(arr, lo, hi) {
	
		// base cases
		if (arr[lo] > lo) {
			return -1;
		}
		if (arr[hi] < hi) {
			return -1;
		}
		if (lo === hi) {
			return lo;
		}

		// must be more than 1 item, so find middle
		mid = lo + Math.floor((hi - lo) / 2);

		// recurse left or right if not mid
		if (arr[mid] === mid) {
			return mid
		} else if (arr[mid] > mid) {
			return _find(arr, lo, mid-1)
		} else {
			return _find(arr, mid+1, hi)
		}

	})(arr, 0, arr.length - 1);
}
