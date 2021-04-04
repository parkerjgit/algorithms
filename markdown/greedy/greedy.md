# Greedy

## Notes

A greedy algorithm use heuristic to make a locally optimal choice at each step with the hope of finding or approximating a globally optimal solution in a reasonable time. - [Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)

1. Greedy Algorithms are **not necessarily optimum**, but sometimes are. (eg. Coin changing problem optimum for denominations of form [1, r, r2, r3,...])
3. Often good idea to **conceptualize recursively, implement iteratively** for better performance.
4. Greedy algorithms/heuristics are often intuitive, but sometimes they aren't. (eg. xxx)
5. **Dijkstra's Algorithm** for finding **shortest paths** is a connonical example.
6. Other examples include **Prim's Algorithm** for **minimum spanning trees**, and **scheduling trees** (ie. task assignment).
7. Find majority element in linear time and constant space complexity (i.e. without using a hash map), by designating first element the majority candidate, incrementing a count on occurances and decrementing on non-occurances while count is non-zero. If count hits zero, take next item as candidate and procede. (e.g. EPI 17.5)
8. Find the "ample" city in gas-up problem by making one pass through cities, tracking gas remaining, and returning city with the min gas remaining before gassing up. (e.g. EPI 17.6)
9. Find max water trapped by an array, representing equally spaced vertical lines, by indexing first/last elements and working inward by advancing the end with the shorter line, i.e. eliminating advancements of the taller, and keeping track of max water trapped so far. (e.g. EPI 17.7)
10. Find longest substring with unique characters

---
## US Coin change

1. Sort denominations by size
2. Loop over each denomination
3. Take as many of each denomination as you can
*  Note, this is not optimum for all denominations, eg. British Pence, came in [30, 24, 12, 6, 3, 1], but is optimum for US currency, as well as denominations of the general form [1, r, r2, r3,...].

```py
def change_making(cents):
    COINS = [100, 50, 25, 10, 5, 1]
    num_coins = 0

    for coins in COINS:
        num_coins += cents // coin  # take as many as you can
        cents %= coin               # update remaining

    return num_coins
```
---
## Min covering set

1. Sort intervals by end time
2. Loop over intervals
3. Count end of each interval that doesn't overlap with previous counted interval.

```
------|1
   ---|--
        ----|2
         ---|---
      ------|----
               -----|3
                 ---|----
```

**Python:**

```py
def _min_covering_set_size(intervals):

  # sort intervals by end time
  intervals.sort(key=lambda x: x[1])

  last_end, size = 0, 0

  for i in intervals:
      start = i[0]
      end = i[1]

      if start > last_end:
          # last end will not cover any more intervals.
          last_end = end
          size += 1

  return size
```

---
## Find max interval collisions (meeting rooms)

1. step thru start and end events in temporal order (take min at each step)
2. _if meeting starts, incr meeting rooms currently occupied, and update max occupied
3. _if meeting ends, decr meeting rooms currently occupied

```js
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
    if (starts[i] == ends[j]) { // one meeting starts and another one ends. its a wash
      i++;
      j++;

    } else if (starts[i] < ends[j]) { // start a meeting
      rooms++;
      minRooms = Math.max(rooms, minRooms);
      i++;

    } else { // end a meeting
      rooms--;
      j++;
    }
  }

  return minRooms;
}
```

---
## Find the minimum time to complete a set of tasks (task scheduling)

1. count tasks by type
2. allocate idle slots based on most frequently occuring task
3. loop through rest of tasks, filling idle slots as you go

```js
var countScheduledTasks = function(tasks, n) {

    if (n == 0)
        return tasks.length;

    // count tasks, e.g.,
    // counter([C, A, A, B, B, B]) -> [3, 2, 1] (sorted)
    let [maxCount, ...restCounts] = counter(tasks);

    // pre-allocate idle slots based on max count
    let idle = n * (maxCount - 1);

    // fill idle slots with rest of tasks
    for (let i = 0; i < restCounts.length; i++) {
        idle -= Math.min(maxCount - 1, restCounts[i]); // handle multiple tasks with max frequency
        if (idle <= 0) {
            break;
        }
    }

    return Math.max(tasks.length + idle, tasks.length);
};
```
(see [full implementation](javascript\greedy\scheduleTasks.js))

---
## max trapped water

1. Track left and *inclusive right* sides of container, starting at full width.
2. While container has a width (ie left < right)
3. _advance the shorter side inward and update max water contained so far.

**Javascript:**

```js
var maxTrappedWater = function(height) {

  let [maxArea, left, right] = [0, 0, height.length - 1];

  while (left < right) {

      maxArea = Math.max(maxArea, (right - left) * Math.min(height[left], height[right]));

      if (height[left] < height[right]) {
          left++;

      } else { // height[right] < height[left]
          right--;
      }
  }
  return maxArea;
};
```

**Notes:**
* intuition to advance short: short determines the volume, so we can't do better using that height b/c we are moving outward-in.

---
## find longest substring with unique characters

1. Track *left* and *exclusive right* ends of slinky
2. While room to expand right:
3. _if unique, expand slinky by advancing right
3. _if duplicate, shrink slinky by advancing left

**Javascript:**

```js
function longestSubstring(str) {

  var [left, right] = [0,1];
  var longest = [left, right];    // indices of longest so far (excluding right!)
  var included = new Set();

  // const isRepeating = (left, right) => str.slice(left, right).includes(str[right]);
  const isRepeating = (right) => included.has(str[right])

  while (right < str.length) {

    if (isRepeating(right)) {
      longest = Math.max(right - left, longest[1] - longest[0])
      included.remove(str[left]);
      left++;                     // repeating, shrink slinky

    } else {
      included.add(str[right]);
      right++;                    // not repeating, grow slinky
    }
  }
  return str.slice(...longest);   // exclude right
}
```
(see [full implementation](javascript\arrays_and_strings\longest_substring.js))

---
## Find two minimum length non-overlapping subarrays with target sum

```js
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
```
(see [full implementation](./../../javascript/greedy/subarray_sum.js))

see also https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays

**notes:**
  * This is probably not strictly speaking a greed solution b/c we are maintaining a lookup.

---
## min-covering subarray

Find the smallest subarray that covers the target set

```js
function minCoveringSubarr(arr, set) {

  const isSetCovered = (left, right) {...}

  if (!isSetCovered(0, arr.length))
    return -1

  let sub = {left: 0, right: 1};                                      // current subarray
  let minSub = {left: 0, right: arr.length};                          // min subarray so far

  while (sub.right < arr.length) {

    if (isSetCovered(sub.left, sub.right)) {                          // set is covered!
      minSub = (sub.right - sub.left < minSub.right - minSub.left)
          ? {...sub}
          : minSub;
      sub.left++;

    } else {                                                          // set not covered
      sub.right++
    }
  }

  return [minSub.left, minSub.right];
}
```

---
## Add Interval

Note: there is a faster solution using bin search to find left and right endpoints. see javascript\searching_and_sorting\add_interval.js

```js
const addInterval = (intervals, toAdd) => {
    intervals = insertInterval(intervals, toAdd); // insert into set without merging
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
```

---
## More problems

1. Bike assignment (campus bikes)
    1. Find distance between all candidate pairs, sort by distance between them, then greedily take pairs from left-to-right (see [full implementation](javascript/searching_and_sorting/campus_bikes.js))

1. split array into consec subsequences - see [solution](./../../javascript/searching_and_sorting/consec_subsequences.js)

