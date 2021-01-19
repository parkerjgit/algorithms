## Balancing Trees



---

1. A very unbalanced BST is basically a linked list with linear O(n) search time
2. Self-balanced BSTs ensure logorithmic O(logn) upper bound on search time.
3. Self-balancing BSTs can be used for efficient dictionary implementations with logn runtime for dictionary operations (insert, delete, query).
3. Red-Black Trees...
4. AVL Trees...
4. Prefer Red-Black trees for insertion/deletion and AVL trees for search.

---

### A very unbalanced BST is basically a linked list with linear O(n) search time

BSTs solve the need for data structure that is *both* fast search and *flexible* to update, BUT when the become very unbalanced or *skewed* they're logorithmic search time degrades to linear. This is because in the worst case an unbalanced BST is just a linear linked list with some wasted overhead:

```
    n
     \
      n
       \
        n
```

### Self-balanced trees ensure logorithmic O(logn) upper bound on search time.

Recall that BST operations have a O(h) upperbound on search runtime. We know that **H equals logn for a balanced tree** b/c number of nodes doubles at every level, so if we make sure tree is always balanced we can ensure O(logn) search time.

### Self-balancing BSTs can be used for efficient dictionary implementations with logn runtime for dictionary operations (insert, delete, query).

Can also ensure O(logn) runtime for dictionary operations (insert, delete, query). *Self-balanced trees* do some operation during insertion and deletion to balance themselves. In addition nodes on self-balanced tree types (e.g. Red-Black Trees and AVL Trees) have additional constraints placed on them.

> From an algorithm design viewpoint, it is important to know that these trees
exist and that they can be used as black boxes to provide an efficient dictionary implementation. (Skiena 82)

[Skiena, Steven S. 2012. The algorithm design manual. London: Springer.](https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1848000693/ref=sr_1_4?ie=UTF8&qid=1492123225&sr=8-4&keywords=Algorithms+in+a+nutshell)

### Red-Black Tree

Red-Black Tree is a kind of *self-balancing Binary Search Tree* where every node follows following rules. 

```
1. Every node is either red or black. (extra bit required for each node)
2. Root is always black. (optional rule)
3. All leaves are black NULLs.
3. There are no adjacent red nodes (ie all red nodes have black parents)
4. Every path from root (or node x) to a NULL leaf has same number of black nodes. (The black-height does NOT include the root node)
```

### Extra bit needed for Red-Black tree nodes is a negligable amount of space.

The Red-Black tree does not contain any other data specific to its being a red–black tree so its memory footprint is almost identical to a classic binary search tree.

https://en.wikipedia.org/wiki/Red%E2%80%93black_tree

### Red-Black Insertion, Deletion, Rotation

Red-Black Tree nodes are inserted as per BST rules, then colored red and given black leaves. After insertion, there are 5 different sinerios or cases to handle depending on state and structure of the newly modified tree:

```
```

tbd...

### Prefer Red-Black trees for insertion/deletion and AVL trees for search.

The AVL trees are more balanced compared to Red Black Trees, but they may cause more rotations during insertion and deletion. So if your application involves many frequent insertions and deletions, then Red Black trees should be preferred. And if the insertions and deletions are less frequent and search is more frequent operation, then AVL tree should be preferred over Red Black Tree.

reference:
http://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/