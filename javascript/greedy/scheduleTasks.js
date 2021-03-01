/*
Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

source: Task Scheduler (leetcode 621) - https://leetcode.com/problems/task-scheduler/
*/
{

  /**
   * @param {character[]} tasks
   * @param {number} n
   * @return {number}
   */
  function countScheduledTasks(tasks, n) {

    if (n === 0) {
        return tasks.length;
    }

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
  }

  // [A, A, B, B, B] -> [3, 2]
  let counter = (items) => {
    let counts = Array(26).fill(0);
    for (let i = 0; i < items.length; i++) {
        let idx = items[i].charCodeAt(0) - 'A'.charCodeAt(0);
        counts[idx]++;
    }
    counts.sort((a, b) => b - a);
    return counts.filter(cnt => cnt > 0);
  }

}
