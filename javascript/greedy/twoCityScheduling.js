/*
A company is planning to interview 2n people. Given the array costs where costs[i] = [aCosti, bCosti], the cost of flying the ith person to city a is aCosti, and the cost of flying the ith person to city b is bCosti.

Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.

Example:

Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110

Constraints:

2 * n == costs.length
2 <= costs.length <= 100
costs.length is even.
1 <= aCosti, bCosti <= 1000

source: Two City Scheduling (leetcode 1029) - https://leetcode.com/problems/two-city-scheduling/
*/

// 1. sort costs by spread using decorate-sort-undecorate (DSU)
//     10      170      -350    -10
// [[10,20],[30,200],[400,50],[30,20]]
//     170      10      -10     -350
// [[30,200],[10,20],[30,20], [400,50]]
//
// 2. choose city a for first half and city b for other half

/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function(costs) {

  const delta = ([a, b]) => b - a;

  return costs

      // 1. sort costs by cost spread, ie delta
      .sort((a, b) => delta(b) - delta(a))

      // 2. choose city a for first half and city b for other half
      .map((cost, i) => (i < costs.length / 2) ? cost[0] : cost[1])
      .reduce((a, b) => a + b, 0)

};
