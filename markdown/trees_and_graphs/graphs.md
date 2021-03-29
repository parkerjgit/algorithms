# Graphs

1. A graph is a set of vertices and a set of **directed or undirected** edges (u,v).
2. **Vertices and Edges** can be decorated with weights, lengths, etc...
3. A **path** is a sequence of vertices, and the **path length** is the number of edges it traverses.
4. If there exists a path from u to v, then v is **reachable** from u.
5. A **directed acyclic graph (DAG)** is a directed graph with no cycles.
6. DAG vertices with no incoming or outgoing edges are called **sources** and **sinks** respectively.
7. A **topological ordering** of vertices in a DAG is such that each edge is from a vertex earlier in the ordering to a vertex later in the ordering.
8. consider topological sort for build order, subsequences, schedules, etc.
8. cont. on EPI pg 276 with basic concepts...
9. A graph can be implemented using an **adjacency list** or an **adjacency matrix**.
10. If each vertice has at most one edge, implement the *adjacency list* with a dictionary where key/value pairs correspond to u,v edge pairs (or better yet, use an array if vertices map to array indices) (see EPI 277.)
11. If vertices have multiple edges can still use dict, where dict values are lists of tuples corresponding to outgoing edges, or alternatively, maintain seperate lists of vertices and edges. May have to use multiple representations for more complex problems.
12. If using graph to model a grid, or if graph is highly connected, consider an adjacency matrix.
10. graphs are ideal for modeling **binary relationships between pairs of objects**
11. Graphs are natural for **spatial relationships**, but consider them more generally for any binary relationship between objects (e.g. links, followers, etc.)
12. Prefer **DFS** for graph problems that entail analyzing sturcture (e.g. looking for cycles, connected components, topological ordering of a DAG, etc.)
13. Prefer **BFS** for optimization problems (e.g. shortest path, minimum spanning tree, etc.), which often involve computing dist from start vertex
14. DFS and BFS both compute in linear time **O(m + n)** for m edges and n vertices (or nodes)
15. Consider union-find as alternative to DFS in undirected graphs, eg. for cycle detection in **undirected graph**
16. Use DFT with backtracking for cycle detection in **directed graph** (Use recursion when backtracking for now. seems more intuitive.)
17. Use backtracking, as alternative to passing new value down recursion stack, to save space.

**Javascript**

**Python**

**C#**

---
## Warm-up

1.

---
## Represent a graph as adjacency list, adjacency map, and adjecency matrix and convert between

```js
let node = {adj: [node2, node3, ...]}               // recursive node repr. (of spanning tree)
let node = {adj: [2,3]}

let nodeMap = {1: node1, 2: node2, ...}             // map node id to node. Req. for adjacency list/map/matrix
let nodeMapEntries = [{id: 1, node: node1}, ...]    // don't think would ever see this

let edges = [(1, 2), (1, 3), (2, 4), ...]           // tuple repr. edge in graph. tuple should be integer tuples repr id pairs.
let edges = [{u: 1, v: 2}, ...]

let adjMap = {1: [2,3], 2: [4], ...}                // key/value pair maps node to its neighbors
let dataMap = {1: 100, 2: 120, ...}
let adjMap = {1: {data: 100, adj: [2,3]}}           // dodn't like this

let adjMapEntries = [[1, [2, 3]], ...]              // need to build map before,
let adjMapObjects = [{id: 1, adj: [2, 3]}, ...]              // need to build map before,

let adjMatrix = [[0,0,1,...], ...]                  // "1" repr. edge between nodes mapped to row & col
let data = [100, 120, ...]
let nodeIds = [1,2,3,...]
let hashFn = (nodeId) => arrayIdx
let revHashFn = (arrayIdx) => nodeId
let dataLookup = (nodeId) => data(hashFn(nodeId));
```

---
## Get Employee Importance

```js
function GetImportance(employees, id) {

	let adjMap = new Map(),
      impMap = new Map();

  employees.forEach(({id, importance, subordinates}) => {
      adjMap.set(id, subordinates)
      impMap.set(id, importance)
  })

  function _getImportanceDft(id) {

      let importance = impMap.get(id),
          subordinates = adjMap.get(id);

      if (!subordinates)
          return 0;

      return subordinates
          .map(id => _getImportanceDft(id))
          .reduce((a, b) => a + b, importance)
  }

  return _getImportanceDft(id)
}
```
(see [full implementation](javascript\trees_and_graphs\employee_importance.js))

---
## Validation: Does DAG have cycles (or redundant connections)?

search every spanning tree by recursively searching from every node:
    * mark nodes visited in spanning tree - if visit a node twice in spanning tree (ie subtree), it has cycle
    * mark nodes visited by function - skip nodes that have already been visited

```js
var detectCycleInDAG = function(adjMap) {

  let visited = new Set(); // visited in graph globally

  for (let prereq of Object.keys(adjMap)){
      if (detectCycleInPath(prereq, adjMap, visited, new Set())) {
          return true;
      }
  }

  return false;
};

function detectCycleInPath(node, adjMap, visited = new Set(), path = new Set()) {

  if (path.has(node)) return true;      // found cycle
  if (visited.has(node)) return false;  // ignore visted nodes

  visited.add(node);                    // mark visited

  for (let adj of adjMap[node]) {
      path.add(parseInt(node));
      if (detectCycleInPath(adj, adjMap, visited, path)) {
          return true;
      }
      path.delete(node);                // backtrack!
  }

  return false;                         // no cycles!
}
```

**Notes:**
* related problems: Course Schedule

---
## Validation: Does Undirected Graphy have cycles (or redundant edges)?

**union-find w/ parents array**

```js
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
```
see [full implementation](.\javascript\trees_and_graphs\redundant_connections.js)

---
## Validation: Is graph bipartite

---
## Searching: Find all Paths in Directed Graph.

---
## Searching: Does path exist between two nodes?

intuition: dft

---
## Searching: Find Shortest Path (or path with minimum distance/cost/effort/etc between two nodes) in Directed Graph.

intuition: bft

**Dijkstra's Algorithm** for Single-Source

DIJKSTRA’S algorithm, is a *GREEDY* algorithm finds the shortest path from a node to all other nodes in a directed graph, although the search may be halted once shortest path to a target node is known.

---
## Searching: Find minimum cost to connect all/muliple nodes (minimum spanning tree) in undirected graph?

see https://leetcode.com/problems/min-cost-to-connect-all-points/

---
## Searching: Count number of connected components.

---
## Searching: Find least/most connected node (e.g. city with smalles number of neighbors)

---
## Sorting: Topological Sorting

https://www.interviewcake.com/concept/java/topological-sort

course schedule - https://leetcode.com/problems/course-schedule-ii/solution/
build order -
sequence reconstruction

see https://leetcode.com/problems/course-schedule-ii/discuss/680933/topologically-sort-the-directed-graph

---
## Sorting: Topological order from edges (ie prerequisites, dependancies, etc.)

---
## Sorting: Topological order from subsequences (eg. Sequence Reconstruction Problem)

```js
const sequenceReconstruction = function(superseq, seqs) {

  ...

  // build graph
  for (let seq of seqs) {
    for (let i = 1; i < seq.length; i++) {
      let [from, to] = [ seq[i - 1], seq[i] ]
      adjList[from].push(to);
      indegrees[to] += 1;
    }
  }

  let i = 0; // index of superseq
  let q = nodes.filter(n => indegrees[n] === 0);
  while (q.length) {

    let cur = parseInt(q.shift());

    if (q.length > 0) return false; // can only have 1 node at time with zero indegree
    if (cur !== superseq[i]) return false; // that node must be match ith node in superseq

    // decrement indegrees for adjacencies and push any that now have zero indegrees to queue
    for (let node of adjList[cur]) {
      indegrees[node]--;
      if (indegrees[node] === 0) {
        q.push(node)
      }
    }
    i++;
  }

  return i === superseq.length
}
```
(see [full implementation](./../../javascript/trees_and_graphs/sequence_reconstruction.js))

---
## Disjointed Undirected Graphs: Merge Accounts

**Union-Find via hash table**

```js
var accountsMerge = function (accounts) {
  const parents = {};       // email -> parent (root b/c collapsed)
  const names = {};         // email -> name
  const allEmails = {};     // root -> all emails (including root)

  // implement union/find...

  // 1. initialize disjoint nodes
  for (let [name, ...emails] of accounts) {
      for (let email of emails) {
          parents[email] = email; // no-op if email already initialized
          names[email] = name;
      }
  }

  // 2. build graph, ie perform unions
  for (let [_, firstEmail, ...restOfEmails] of accounts) {
    for (let email of restOfEmails) {
        union(firstEmail, email);
    }
  }

  // 3. group emails by root
  for (let email of Object.keys(parents)) {
      let root = find(email);
      if (root in allEmails) {
          allEmails[root].push(email);
      } else {
          allEmails[root] = [email];
      }
  }

  let result = [];
  for (let [root, emails] of Object.entries(allEmails)) {
    result.push([names[root], ...emails.sort()])
  }
  return result;
};
```
see [full implementation](.\javascript\trees_and_graphs\merge_account.js)

**dft**

tbd...

---
## adf
