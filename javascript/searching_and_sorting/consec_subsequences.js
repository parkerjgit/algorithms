/*
Given an integer array nums that is sorted in ascending order, return true if and only if you can split it into one or more subsequences such that each subsequence consists of consecutive integers and has a length of at least 3.

source: Split Array into Consecutive Subsequences (lc 659) - https://leetcode.com/problems/split-array-into-consecutive-subsequences/
*/

/*
algorithm:
1. maintain counts of values remaining and subsequences tails
2. for each number in arr
3. _try to continue an existing run
4. _else try to start new run by taking next three values
5. _else not possible
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function(nums) {
  const [counts,tails] = counter(nums);

  for (let x of nums) {
    if (counts[x] == 0) {
      continue;

    } else if (tails[x]) { // priviledge continuing existing subsequence
      count[x]--;
      tails[x]--;
      tails[x+1]++;

    } else if (counts[x+1] && counts[x+2]) { // otherwise start new subsequence
      count[x]--;
      count[x+1]--;
      count[x+2]--;
      tails[x+3]++;

    } else {
      return false;
    }
  }
  return true;
}

function counter(arr) {
  let counts = {};
  let zeros = {};
  for (let el of arr) {
    if (!counts[el]) {
      counts[el] = 0;
    }
    if (!zeros[el]) {
      zeros[el] = 0;
    }
    counts[el]++;
  }
  return [counts, zeros];
}

// first attempt

var isPossible = function(nums) {

  // count values
  let counts = {};
  for (let n of nums) {
      if (!counts[n]) counts[n] = 0;
      counts[n]++;
  }

  // start of group *candidates* sorted in asc. order
  let values = Object.keys(counts).map(s=>parseInt(s));

  const canKeepGoing = (j, start) => {
      let k = values[i];
      return [
          j - start >= 3,
          counts[k],
          counts[k+1],
          counts[k+2],
          counts[k+3]
      ].every(x=>x);
  }

  let i = 0;
  while (i < values.length) {
      let start = values[i];

      let j = start;
      while (counts[j] && !canStartNewGroup(j, start, counts)) { // undefined or 0
          counts[j]--;
          if (counts[j] == 0) {
              i++;
          }
          j++;
      }


      // group size must be 3 or more
      if (j - start < 3) {
          return false;
      }
  }

  return true;
};


// heap solution: 
// Keeping a tails dict, which, for every key, contains a heap of lengths of sequences ending with key.
// For every num, if there is a sequence ending with num -1, add num to the shortest sequence ending with num -1. Else, create a new sequence.
// Instead of keeping the actual sequences, we are keeping lengths and ending points. Heap helps us adding num to the smallest sequence at every step.
// from https://leetcode.com/problems/split-array-into-consecutive-subsequences/discuss/589680/Python-heap