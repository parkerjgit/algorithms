# Heap / Priority Queue

## Notes

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Max-Heap-new.svg/220px-Max-Heap-new.svg.png)

* Is a binary tree (typically) that implements a Priority Queue, and is itself, typically implemented as an array.
* Heap-implimented priority queues are often used in Graph Algorithms like Dijkstra’s Shortest Path and Prim’s Minimum Spanning Tree.)
* Is a *[complete binary tree](http://web.cecs.pdx.edu/~sheard/course/Cs163/Doc/FullvsComplete.html)* (all the levels except the last/lowest are full, and in the last/lowest level all the items are on the left) This property allows it to be simply represented with an array.
* The array representation can be achieved by traversing the binary tree in level order, and the mapping from node to parent, left and right nodes are given by `(i-1)//2`, `2i+1` and `2i+2` respectively. (see [Array Representation of Binary Heap](http://www.cse.hut.fi/en/research/SVG/TRAKLA2/tutorials/heap_tutorial/taulukkona.html))
* A Binary Heap is either Min Heap or Max Heap, sometimes counter-intuitive which should be used because the lowest priority is at the top of heap for easy removal.
* The heap *order property* is satisfied for min heap when all parents have priorities less than that of their children. From this we know the smallest priority is at the root, and greatest is at *some* leaf node.
* Find max element in array-implemented min heap by iterating through leaf nodes, ie nodes n/2 to n-1. Still linear time, but not sure if we can do better.
* Heaps support O(1) lookup (vs extraction) of min/max at root, and O(logn) insertions, as well as O(logn) extraction of min/max at root (extract min/max is important operation which deletes and returns root node).
* In order to overcome the Worst-Case Complexity of Quick Sort algorithm from O(n^2) to O( nlog(n) ) in Heap Sort.
* Use heap when *all* you care about is min **OR** max element (not both), ie. **when you don't care about fast lookup/deletion of arbitrary elements**.
* Use a heap to find/compute the **kth or k largest/smallest elements**. Use min-heap for former and max-heap for latter!!!.
* Use a heap to sort and almost sorted, ie k-sorted array in O(n)
* Use a heap to merge k sorted arrays.
* Python supports min-heap thru `heapq` module (max-heap acheived by negating values).
* Binomoial Heap and Fibonacci Heap are variations of Binary Heap. These variations perform union also in O(logn) time which is a O(n) operation in Binary Heap.
* Pass compareFunction to constructor to generalize method for determining priority?
* Pass a max heap size (can default to infinity or max safe int) for maintaining heap of top k elements.

https://en.wikipedia.org/wiki/Heap_(data_structure)

---
## Implement a Min Heap.

```js
function MinHeap(maxHeapSize = MAX_ARRAY_SIZE) {
  this.contents = [];
  this.maxHeapSize = maxHeapSize;
}
MinHeap.prototype = {...}
```

see [full implementation](.\min_heap.md)

---
## Implement a generic Priority Queue.

```js
function PriorityQueue(maxQueueSize = MAX_ARRAY_SIZE, compareFn = (a,b) => a > b) {
  this.maxQueueSize = maxQueueSize,
  this.compareFn = compareFn
  // this.isHigherPriority = compareFn
}
PriorityQueue.prototype = {...}
```
---
## Find the k/kth largest (or most recent, most frequently occuring, closest, ugliest, anything-est, etc...) elements (leetcode 215, 264, 313, 347, 355, 692, epi 10.4)

```js
var topKFrequent = function(words, k) {
    let counts = {};
    let minHeap = new MinHeap((a,b)=>counts[a] > counts[b],k);

    for (let word of words) {

        // update counts
        counts[word] = (counts[word]) ? count[word] + 1 : 1;

        // add to heap. if max size exceeded item will auto pop
        if (!minHeap.contains(word) && counts[word] > counts[minHeap.peek()]) {
            minHeap.pop();
            minHeap.push(word);
        }
    }
```
(untested)

---
## Sort a k-sortted array (epi 10.3)
---
## Merge many sorted arrays (k-way merge (epi 10.1)

1. create min heap of size k.
2. push first element from each array onto heap ***along with corresponding array index!!!***
3. while heap:
3. _pop min from heap and add to result.
4. _push next element ***from the array last popped min was from if any left!!!*** onto the heap.

## Kth smallest element in a 2d-sorted matrix

same as k-way merge, but keep track of element pushed onto heap. see https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/solution/

---
## Implement Heap Sort
---
## Find shortest path (or min distance/cost/time/etc.) from source to target (or all) nodes in weighted DAG (network delay problem)

bft with priority queue (ie dykstra's)

```js
var minDistance = function(weightedEdges, n, src, targ) {
  let adjMap = [...Array(n)].map(n=>[]);
  let minDist = [...Array(n)].map(n=>Infinity);

  // build adj map
  for (let [u,v,w] of weightedEdges) {
      adjMap[u].push([v,w]);
  }

  // bft w/ priority queue
  let pq = new PriorityQueue((a,b) => a.dist > b.dist);
  pq.push({node: src, dist: 0});

  while (pq.size()) {
    let {node, dist} = pq.pop();

    if (minDist[node] < Infinity) continue;

    minDist[node] = dist;

    for (let [v, w] of adjMap[node]) {
      pq.push({
        node: v,
        dist: w + minDist[node] // dist here is the min dist via node, but not nec. the min dist!
      });
    }
  }

  return minDist[targ]; // should return as soon as find not here!
};
```
see [network delay problem](.\..\..\javascript\trees_and_graphs\network_delay.js)

---
## Searching: Find minimum cost to connect all/muliple nodes (minimum spanning tree) in undirected graph?

can be solved using either Kruskal (union-find) or Prim's algorithm (variant of Dykstra's for undirected graph). Choice might come down to whether you already have egdge or adjacency list. Also, easier to implement union-find than a priority queue. Here is Prim's:

```js
function minSpanning(adjMap, n) {
  //let visited = Array(n).fill(false);
  let cost = Array(n).fill(Infinity); // min cost to get to node from src (in this case arbitrarily picked src)

  let weight = (a,b) => ...

  let pq = new PriorityQueue((a,b) => cost[a]-cost[b])
  pq.push(0); // 1. can pick any node, so take first
  cost[0] = 0;

  while (pq.size) {
    let cur = pq.pop();

    //visited[cur] = true;
    if (cost[cur] < Infinity) continue;

    for (let adj of adjMap[cur]) {
      pq.push(adj);
      cost[adj] = cost[cur] + weight(cur,adj);
    }
  }
}
```
(untested)

see also solution using Kruskal's Algorithm in [Union-Find](./markdown/union_find/union_find.md)

---
## More Problems

1. Compute median from steaming data (epi 139) - use two heaps! careful, its tricky
2. Find k pairs from two sortted arrays with smallest sum (lc 373)
3. Find kth smalles element in a sorted matrix (lc 378)
4. Sort Characters by frequency (lc 451) - count then bucket sort!
5. Split array into consecutive subsequences (lc 659)
6. Time it takes to reach all node in network from a source node (lc 743)
7. Find shortest/cheapest/anything-est path/flight/etc... within k stops (lc 787)
8. Find the k closest/anything-est nodes from source (lc 973)
9. Separate duplicate elements (barcode problem, lc 1054)
10. Sort an increasing-decreasing array (epi 10.2)

https://leetcode.com/tag/heap/
