## Heaps

* Is a binary tree that implements a Priority Queue, and is itself, typically implemented as an array. (Priority queues are often used in Graph Algorithms like Dijkstra’s Shortest Path and Prim’s Minimum Spanning Tree.)
* Is a *[complete binary tree](http://web.cecs.pdx.edu/~sheard/course/Cs163/Doc/FullvsComplete.html)* (all the levels except the last/lowest are full, and in the last/lowest level all the items are on the left) This property allows it to be simply represented with an array.
* The array representation can be achieved by traversing the binary tree in level order, and the mapping from node to parent, left and right nodes are given by `(i-1)//2`, `2i+1` and `2i+2` respectively. (see [Array Representation of Binary Heap](http://www.cse.hut.fi/en/research/SVG/TRAKLA2/tutorials/heap_tutorial/taulukkona.html))
* A Binary Heap is either Min Heap or Max Heap, sometimes counter-intuitive which should be used.
* The heap *order property* is satisfied for min heap when all parents have priorities less than that of their children. From this we know the smallest priority is at the root, and greatest is at *some* leaf node. 
* Heaps support O(1) lookup (vs extraction) of min/max at root, and O(logn) insertions, as well as O(logn) extraction of min/max at root (extract min/max is important operation which deletes and returns root node).
* Use heap when *all* you care about is min or max element, ie. **when you don't care about fast lookup/deletion of arbitrary elements**.
* Use a heap to find/compute the **kth or k largest/smallest elements**. Use min-heap for former and max-heap for latter!!!
* Use a heap to sort and almost sorted array.
* Use a heap to merge k sorted arrays.
* Python supports min-heap thru `heapq` module (max-heap acheived by negating values).

---

http://www.cse.hut.fi/en/research/SVG/TRAKLA2/tutorials/heap_tutorial/index.html
https://www.geeksforgeeks.org/binary-heap/
