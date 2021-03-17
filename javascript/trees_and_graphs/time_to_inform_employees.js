/*
A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID. Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure. The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news. The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news). Return the number of minutes needed to inform all the employees about the urgent news.

Constraints:

1 <= n <= 105
0 <= headID < n
manager.length == n
0 <= manager[i] < n
manager[headID] == -1
informTime.length == n
0 <= informTime[i] <= 1000
informTime[i] == 0 if employee i has no subordinates.
It is guaranteed that all the employees can be informed.

source: Time needed to inform employeers (leetcode 1376) - https://leetcode.com/problems/time-needed-to-inform-all-employees/
*/

/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, managers, informTime) {

  let maxTime = 0;

  // build adj list
  let adjList = [...Array(n)].map(el => []);
  managers.forEach((m,i) => {
      if (m >= 0) {
          adjList[m].push(i);
      }
  })

  const dft = (root, timeSoFar) => { // timeSoFar is time to get to root
    let children = adjList[root];

    if (children.length == 0) {
      maxTime = Math.max(maxTime, timeSoFar);
    }

    for (let child of children) {
      dft(child, timeSoFar + informTime[child]);
    }
  }

  dft(headID, informTime[headID]);
  return maxTime
};
