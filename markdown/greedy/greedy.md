# Greedy

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
## task scheduling

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
        idle -= Math.min(maxCount - 1, restCounts[i]);
        if (idle <= 0) {
            break;
        }
    }

    return Math.max(tasks.length + idle, tasks.length);
};
```

---
## max trapped water

1. Track left and *inclusive right* sides of container, starting at full width.
2. While container has a width (ie left < right)
3. _advance the shorter side inward and update max water contained (ie area) so far.

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

  // TODO: optimize this to use indices rather than slice
  const isRepeating = (left, right) => str.slice(left, right).includes(str[right]);

  while (right < str.length) {

    if (isRepeating(left, right)) {
      longest = Math.max(right - left, longest[1] - longest[0])
      left++;                     // repeating, shrink slinky

    } else {
      right++;                    // not repeating, grow slinky
    }
  }
  return str.slice(...longest);   // exclude right
}
```

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

    if (isSetCovered(sub.left, sub.right)) {                             // set is covered!
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

