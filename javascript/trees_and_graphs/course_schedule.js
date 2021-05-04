/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

source: course-schedule (leetcode 207) - https://leetcode.com/problems/course-schedule
*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function(numCourses, prerequisites) {

  let visited = new Set(); // visited in graph globally

  // convert to adj map
  let adjMap = Object.create(null); // prereq -> [course, course]
  for ([course, prereq] of prerequisites) {
      if (!adjMap[prereq]) {
          adjMap[prereq] = [parseInt(course)];
      } else {
          adjMap[prereq].push(parseInt(course));
      }
      if (!adjMap[course]) {
          adjMap[course] = [];
      }
  }

  // dft cycle detect from every node
  for (prereq of Object.keys(adjMap)){
      if (detectCycle(prereq, adjMap, visited, new Set())) {
          return false;
      }
  }

  return true;
};

function detectCycle(node, adjMap, visited, path = new Set()) {

  if (path.has(node)) {
      return true; // found cycle
  }

  if (visited.has(node)) {
      return false; // ignore visted nodes
  }

  visited.add(node);

  for (let adj of adjMap[node]) {
      path.add(parseInt(node));
      if (detectCycle(adj, adjMap, visited, path)) {
          return true;
      }
      path.delete(node); // backtrack!
  }

  return false;
}

// topo sort

var canFinish = function(numCourses, prerequisites) {
    let adjMap = [...Array(numCourses)].map(x=>[]),
        indegree = Array(numCourses).fill(0);

    // build graph
    for(const [to, from] of prerequisites){
        adjMap[from].push(to);
        indegree[to]++;
    }

    // implement Kahn's Algorithm
    let removed = []; // topo sorted nodes
    let q =[];

    // 1. add zero indegree nodes to q
    for (let i = 0; i < indegree.length; i++) {
        if (indegree[i] == 0) q.push(i)
    }

    // 2. while zero-indegree nodes left to process:
    //    remove node, update indegrees and add new zero indegree nodes to q
    while(q.length){
        let cur = q.shift();

        removed.push(cur);

        for(let adj of adjMap[cur]){
            indegree[adj]--;
            if(!indegree[adj]){
                q.push(adj);
            }
        }
    }

    // 3. if processed all nodes, there are no cycles
    return removed.length === numCourses;
    // return (removed.length == numCourses) ? removed : [];
};
