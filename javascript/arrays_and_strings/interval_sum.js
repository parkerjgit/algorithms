/*
question:
Write a function called sumIntervals/sum_intervals() that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.

source:
https://www.codewars.com/kata/sum-of-intervals/train/javascript
*/

function sumIntervals(intervals){
  var sum = 0;

  // sort intervals by starts
  intervals.sort((a, b) => a[0] - b[0]);
  var [i, j] = intervals[0];

  intervals.forEach(interv => {
    [m,n] = interv;
    if (m > j) {
      sum += j - i;
      [i,j] = [m,n]
    } else if (n > j) {
      j = n;
    }
  })

  sum += j - i;
  return sum;
}

describe('sumInterval', function() {
  it('accepts an array of intervals, and returns the sum of all the interval lengths', function() {
    expect(sumIntervals([[1,4], [7, 10], [3, 5]])).toEqual(7)
  })
})
