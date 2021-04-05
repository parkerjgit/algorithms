/*
Android devices have a special lock screen with a 3 x 3 grid of dots. Users can set an "unlock pattern" by connecting the dots in a specific sequence, forming a series of joined line segments where each segment's endpoints are two consecutive dots in the sequence. A sequence of k dots is a valid unlock pattern if both of the following are true:

1. All the dots in the sequence are distinct.
2. If the line segment connecting two consecutive dots in the sequence passes through any other dot, the other dot must have previously appeared in the sequence. No jumps through non-selected dots are allowed.

source: Android unlock patterns (lc 351) - https://leetcode.com/problems/android-unlock-patterns/
*/


/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var numberOfPatterns = function(m, n) {

  let mustHave = [...Array(10)].map(r=>[]);
  [[1,3,2], [1,7,4], [7,9,8], [9,3,6], [3,7,5], [1,9,5], [4,6,5], [2,8,5]]
      .forEach(([a,b,c]) => {
          mustHave[a][b] = c;
          mustHave[b][a] = c;
      })

  let count = 0;
  // let res = [];
  function perms(t, used, prev, path=[]) {

      if (t <= n - m && t >= 0) {
          //res.push([...path])
          count++;
      }

      for (let i = 1; i <= 9; i++) {
          if (used[i]) continue;
          let mustHaveUsed = prev && mustHave[prev][i];
          if (mustHaveUsed && !used[mustHaveUsed]) continue;

          //path.push(i)
          used[i] = true;
          //perms(t-1, used, i, path);
          perms(t-1, used, i);
          //path.pop();
          used[i] = false; // backtrack
      }
  };
  perms(n, Array(10).fill(false), null)
  return count;
  // return res;
};

// see optimization - https://leetcode.com/problems/android-unlock-patterns/discuss/82463/Java-DFS-solution-with-clear-explanations-and-optimization-beats-97.61-(12ms)
