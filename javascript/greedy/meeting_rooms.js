/*
Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

Constraints:

1 <= intervals.length <= 104
0 <= starti < endi <= 106

source: Meeting Rooms II (lc 253) - https://leetcode.com/problems/meeting-rooms-ii/
*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
  let minRooms = 0; // min rooms required, equal to max number of simultaneous collisions

  let starts = [];
  let ends = [];
  for (let [start,end] of intervals) {
    starts.push(start);
    ends.push(end);
  }

  // sort both asc.
  starts.sort((a,b)=>a-b);
  ends.sort((a,b)=>a-b);

  let [i,j] = [0,0];
  let rooms = 0; // rooms currently occupied
  while (i < starts.length) {
    if (starts[i] == ends[j]) {
      // one meeting starts and another one ends. its a wash
      i++;
      j++;
    } else if (starts[i] < ends[j]) {
      // start meeting
      rooms++;
      minRooms = Math.max(rooms, minRooms);
      i++;
    } else {
      // end meeting
      rooms--;
      j++;
    }
  }

  return minRooms;
}
