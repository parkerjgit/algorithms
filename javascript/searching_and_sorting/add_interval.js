/*
write a program which takes as input an array of disjoint closed interval withinterger 
endpoints, sorted by ncreasing order of left endpoint, an dan interval to be added, and 
returns that union of the intervales in the array and the added interval. Your result
should be expressed as an union of disjoint intervals sorted by left endpoint.

source: EPI 13.6
*/

const insertInterval = (intervals, toInsert) => {
    let i = 0;
    while (i < intervals.length && intervals[i][0] < toInsert[0]) 
        i++;
    return [
        ...intervals.slice(0,i), 
        toInsert,
        ...intervals.slice(i)
    ];
}

const addInterval = (intervals, toAdd) => {
    intervals = insertInterval(intervals, toAdd);
    let [s,e] = intervals[0];
    let result = [];
    intervals.slice(1).forEach( ([start,end]) => {
        if (start > e) {
            result.push([s,e]);
            [s,e] = [start,end];
        } else if (end > e) {
            e = end;
        } else {
            // skip
        }
    })
    result.push([s,e]);
    return result;
}

// using binary search to find left and right insertion points - https://leetcode.com/problems/insert-interval/submissions/

var addInterval = function(intervals, [newStart, newEnd]) {
    let starts = intervals.map(int => int[0]); 
    let ends = intervals.map(int => int[1]);

    // intervals on left and right of new interval
    let left = binSearch(ends, newStart, 0, intervals.length, true); // ceiling
    let right = binSearch(starts, newEnd, 0, intervals.length, false); // floor
    
    // new interval is non-overlappping
    if (left > right) { 
        return [...intervals.slice(0, left), [newStart, newEnd], ...intervals.slice(left)];
    }

    // new merged interval
    let mergedStart = Math.min(newStart, intervals[left][0]);
    let mergedEnd = Math.max(newEnd, intervals[right][1]);

    return [...intervals.slice(0, left), [mergedStart, mergedEnd],...intervals.slice(right + 1)]
};

function binSearch(arr, target, left, right, ceiling) {
  
  while (left < right) {
    let mid = left + Math.floor((right-left)/2);

    if (arr[mid] == target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  if (ceiling) {
    return left;
  } else { // floor
    return left - 1;
  }
}

// test

describe('insertInterval', function() {
    it('inserts interval into start-sortted array of intervals', function() {
        expect(insertInterval([[1,2], [3,6], [8,10], [11,12]], [2,9])).toEqual([[1,2], [2,9], [3,6], [8,10], [11,12]]);
        expect(insertInterval([[1,2], [3,6], [8,10], [11,12]], [0,1])).toEqual([[0,1], [1,2], [3,6], [8,10], [11,12]]);
        expect(insertInterval([[1,2], [3,6], [8,10], [11,12]], [12,19])).toEqual([[1,2], [3,6], [8,10], [11,12], [12,19]]);
    })
})
describe('addInterval', function() {
    it('adds interval into start-sortted array of intervals', function() {
        expect(addInterval([[1,2], [3,6], [8,10], [11,12]], [2,9])).toEqual([[1,10],[11,12]]);
        expect(addInterval([[1,2], [3,6], [8,10], [11,12]], [2,3])).toEqual([[1,6], [8,10], [11,12]]);
        expect(addInterval([[1,2], [3,6], [8,10], [11,12]], [13,19])).toEqual([[1,2], [3,6], [8,10], [11,12], [13,19]]);
    })
})