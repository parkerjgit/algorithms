/*
Implement a SnapshotArray that supports the following interface:

SnapshotArray(int length) initializes an array-like data structure with the given length.  Initially, each element equals 0.
void set(index, val) sets the element at the given index to be equal to val.
int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id

source: Snapshot Array (leetcode 1146) - https://leetcode.com/problems/snapshot-array/
*/

var SnapshotArray = function(length) {
  this.cursor = 0;
  this.changesets = {}; // index -> { sid -> val }
  for (let idx of [...Array(length).keys()]) {
      this.changesets[idx] = {'0':0}
  }
};

SnapshotArray.prototype = {
  set(index, val) {
    this.changesets[index][this.cursor] = val; // overwrite previous since last commit
  },

  snap() {
    return this.cursor++;
  },

  get(index, sid) {
    let changeset = this.changesets[index];

    // if change logged for sid, use it
    if (sid in changeset) {
      return changeset[sid];
    }

    // else, find most recent change (before sid)
    let sids = Object.keys(changeset)
    let closest = floorBinSearch(sids, sid, 0, sids.length);
    
    return changeset[closest];
  }
}

function floorBinSearch(arr, target, left, right) {

while (left < right) {
    
  let mid = left + Math.floor((right-left)/2);

  if (arr[mid] < target) {
    left = mid + 1;
  } else {
    right = mid;
  }
}

// always find. return value NOT index!
return arr[left - 1];
}