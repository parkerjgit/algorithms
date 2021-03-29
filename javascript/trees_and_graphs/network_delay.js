/*
You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

source: Network Delay Time (lc 743) - https://leetcode.com/problems/network-delay-time/
*/

// dykstra's 

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
  let adjMap = [];
  let dist = [0];
     
  // initialize maps
  for (let node = 1; node <= n; node++) {
      adjMap[node] = [];
      dist[node] = Infinity;
  }
  
  // build adj map
  for (let [u,v,w] of times) {
      adjMap[u].push([v,w]);
  }

  // bft w/ priority queue
  let pq = new PriorityQueue((a,b) => a[1] > b[1]);
  pq.push([k,0]);
     
  while (pq.size() > 0) {
    let [v,w] = pq.pop();

    if (dist[v] < Infinity) continue;

    dist[v] = w;

    for (let [vv, ww] of adjMap[v]) {
      pq.push([vv, ww + dist[v]]);
    }
  }

  // dist is shortest path to each node!
  
  let max = Math.max(...dist);
  return max < Infinity ? max : -1;
};

// dfs 

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var networkDelayTime = function(times, n, k) {
  let adjMap = [];
  let minElapsed = [0]; // stick zero in first index so don't have to work with sparse arr
     
  // initialize maps
  for (let node = 1; node <= n; node++) {
      adjMap[node] = [];
      minElapsed[node] = Infinity;
  }
  
  // build adj map
  for (let [u,v,w] of times) {
      adjMap[u].push([v,w]);
  }
  
  function dft(node, elapsed) {
      if (minElapsed[node] <= elapsed) return;
      
      minElapsed[node] = elapsed;      

      for ([v,w] of adjMap[node]) {
          dft(v, elapsed + w);
      }
  }
  
  dft(k,0);
  let max = Math.max(...minElapsed);
  return max < Infinity ? max : -1;
};



