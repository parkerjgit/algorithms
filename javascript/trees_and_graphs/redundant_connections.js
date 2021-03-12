/*
In this problem, a tree is an undirected graph that is connected and has no cycles.

The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added. The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [u, v] with u < v, that represents an undirected edge connecting nodes u and v.

Return an edge that can be removed so that the resulting graph is a tree of N nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array. The answer edge [u, v] should be in the same format, with u < v.

source: Redundant Connections (leetcode xx) - https://leetcode.com/problems/redundant-connection
*/

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findRedundantConnection = function(edges) {
  let parents = Array(edges.length + 1).fill(-1);
  
  const find = (x) => {
      if (parents[x] < 0) {
          return x;
      }
      
      return find(parents[x])
  }
  
  const union = (a, b) => {
      let rootA = find(a);
      let rootB = find(b);
      
      // cycle check has to go here btween lookup and union!!!
      if (rootA == rootB) {
          return false;
      }
      
      parents[rootB] = rootA;
      return true;
  }
  
  // build graph
  for (let [u, v] of edges) {
      if (!union(u, v)) {
          return [u,v];
      }
  }
  
  return -1;
};

// directed graph. solution tricky, based on https://leetcode.com/problems/redundant-connection-ii/discuss/254733/Python-Union-Find-Clear-Logic

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findRedundantConnection = function(edges) {
  let parents = Array(edges.length + 1).fill(-1);
  
  const find = (x) => {
      if (parents[x] < 0) {
          return x;
      }
      
      return find(parents[x])
  }
  
  const union = (a, b) => {
      let rootA = find(a);
      let rootB = find(b);
      
      // cycle check has to go here btween lookup and union!!!
      if (rootA == rootB) {
          return false;
      }
      
      parents[rootB] = rootA;
      return true;
  }

  let [candidate1, candidate2, source] = [null, null, {}];

  for (let [u, v] of edges) {
    if (v in source) {
      [candidate1, candidate2] = [source[v], [u,v]];
      break;
    }
    source[v] = [u,v]
  }

  for (let [u, v] of edges) {
    if ([u,v] === candidate2) {
      continue;
    }
    if (!union(u - 1, v - 1)) {
      if (candidate1) {
        return candidate1;
      }
      
      return [u,v];
    }
  }
  
  return -1;
};
