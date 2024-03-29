# Trees: Binary Trees and BSTs

## Notes

1. Binary trees are linked lists with left and right pointers (plus optional parent pointer). They typically hold a single value (two in the case of interval), and unlike BSTs are not sortted.
2. Binary Search Tree (BST) is a **sorted** binary tree with **no duplicates**, such that: for any node with key x, all nodes in the left subtree have key values < x while all nodes in the right subtree have key values > x.
3. BSTs are fast to search AND update - Sorted arrays allow for fast search, and [double] linked lists support flexible update, but neither support *both* fast search and flexible update. **BSTs address this need**. Lookup, insert and delete all take time proportional to height or logn for balanced trees.
3. **Think of BSTs as an alternative to hash tables OR one way to implement them!**
4. BSTs are fundamentally recursive - An important observation of BSTs is that the top-most node is the root, and all other nodes are the root of a subtree that is also a binary search tree. This of course describes a recursive structure. Furthermore, since a node defines a tree, functions that operate on trees often take the root as the argument rather than the tree, so take note of which is being passed.
5. Search a BST in O(logn) by recursing left *or* right until item is found or node is null.
6. Insert into BST in O(logn) by recursing left or right until the empty spot is found.
7. Unlike Hash table, its easy to find Min/Max of BST (the leftmost/rightmost element). Of course hash table are faster to search with O(1) lookup (vs. O(logn))
8. Both BSTs and hash tables use O(n) space (BSTs use little more in practice)
8. Visiting all the nodes in a rooted binary tree is an important component of many algorithms. It is a special case of traversing all the nodes and edges in a graph. One application of tree traversal is listing the nodes of a tree in order. There are four ways to move through a tree, which produces four distinct node orderings that fall under categories of *breadth-first* and *depth-first*:
8. There are two ways to traverse a BST: breadth-first traversal (BFT) or depth-first traversal (DFT)
9. Implement a BST with a Queue: enqueue root, then while queue is not empty dequeue a node and enqueue its children.
10. Implement a DFT iteratively with a Stack: push root to stack, then while stack is not empty pop a node and push its children.
11. Implement a DFT by recursing left AND right until no more nodes.
12. Implement In-, Pre- and Post- order DFTs by changing the order in which you visit node and recurse on children.
13. Ok to store complex values in BST **provided they are distinct and sortable**, eg. can store intervals in a binary tree (see book a time in calendar problem)
14. **Avoid putting mutable values in BST** or be sure to remove mutable object before updating it and adding it back. (otherwise it will be in wrong spot and lookup will likely fail!)
13. Compute all paths of Binary Tree with a pre-order DFT, handing approp. parent data (partial sum, path concat, etc.) off to children recursively as you go down tree. (if computing number represented by root-to-leaf paths shift number over by multiplying by base then adding next digit. If computing leaf-to-root representation, then  add next digit times base^depth to number) (EPI 9.5)

**Python**

13. [Python] No BST implementation in stdlib. In practice, prefer [sortedcontainers.SortedList](https://pypi.python.org/pypi/sortedcontainers) over custom implementation for fast lookup and update (implemented as list of sublists but functions/performs like a balanced BST).


http://www.grantjenks.com/docs/sortedcontainers/
https://www.youtube.com/watch?v=7z2Ki44Vs4E

---
## Implement a BST

Simplest implementation does not distinguish between a tree and node and tree:

```py
class Node:
    def __init__(self, value, left = None, right = None):
        self.left = left
        self.right = right
        self.value = value

my_bst = new Node(1)
my_bst.insert(2)
```

In practice, wrapper class is also typically implemented:

```py
class BST:
    def __init__(self):
        self.root = None

my_bst = new BST()
my_bst.insert(1)
```

(see [full implementation](.\..\..\javascript\trees_and_graphs\bst.js))

---
## > Search a BST

Search a BST by recursing left or right until node is null or item is found. Since empty nodes are null pointers, we reduce two base cases into one.

```py
def search(node, value):

    # Base Cases: node is null or item is found
    if node is None or node.val == value:
        return node

    # Recurse left or right
    if value > node.value:
        return search(node.right, value)
    else:
        return search(node.left, value)
```

*Note*, searching is generally done in pre-order, b/c we want to check if we found the node before bothering to search children.

---
## Insert a new node into a BST

Insert into BST by recursing left or right until the empty spot is found. The trick to insertion is making sure you test children for empty slots rather than recursing on child before testing for existance as you do with search. This is a slightly atypical recursive pattern b/c no base case before recursion condition. This is because we *know* we are going to find a spot for new node and we need to ensure we find it while visiting its parent so that we can wire it up.

```py
def insert(node, new_value):

    if node.value < new_value:
        if node.right:
            insert(node.right, new_value)
        else: # found it!
            node.right = Node(new_value)
    else:
        if node.left:
            insert(node.left, new_value)
        else: # found it!
            node.left = Node(new_value)
```

The above method work requires that tree (i.e. node) you are inserting into is *not* empty. To handle case of inserting into empty tree, i.e., inserting the first node into tree, we need additional condition.

```python
def insert(node, new_value):

    # first node in tree
    if not node.value:
        node.value = new_value

    # not the first node, so find its place
    else:
        if node.value < new_value:
            if node.right:
                insert(node.right, new_value)
            else:
                node.right = Node(new_value)
        else:
            if node.left:
                insert(node.left, new_value)
            else:
                node.left = Node(new_value)
```

---
## Find min/max value in BST

Unlike a Hash table, its easy to find Min/Max of BST (the leftmost/rightmost element).

The smallest element must be the leftmost subtree, and the maximum element must be the rightmost subtree of the root:

```py
def findMin(node):

    min = node
    while node.left:
        min = node.left

    return min
```

```py
def findMax(node):

    max = node
    while node.right:
        max = node.right

    return max
```

---
## Delete a node from a BST

```js
BSTNode.prototype.remove = function(value) {
  return this.removeNode(value, this)
}

BSTNode.prototype.removeNode = function(value, node) {
    if (node) {
        if (value < node.value && node.left) {
            node.left = this.removeNode(value, node.left);
        } else if (value > node.value && node.right) {
            node.right = this.removeNode(value, node.right);
        } else if (value == node.value) {
            if (node.left && node.right) {
            // two children
            node.value = node.right.min();
            node.right = this.removeNode(node.value, node.right);
            } else {
            // none or one child
            node = node.left || node.right;
            }
        }
    }
    return node;
}
```

https://leetcode.com/problems/delete-node-in-a-bst/discuss/556767/Python3-simple-solution

---
## Traverse BST in level-order (BFT)

Best way to implement level-order traversal of a tree is with a queue. The algorithm looks like this:

1. create empty queue (frontier)
2. enqueue start/root node
3. while queue (not empty):
    a. dequeue node
    b. visit node
    c. enqueue node's children

Here is simple bfs implementation for arbitrary graph:

```py
def dequeue(arr): arr.pop()
def enqueue(arr, x): arr.insert(0,x)
def printLevelOrder(root):
    q = [root]
    while q:
        node = dequeue(q)       # 1. dequeue
        print(node.value)       # 2. visit
        '...'                   # 3. enqueue children
```

Time complexity is linear O(n) for tree (and for arbitrary graph *if* we mark nodes visited to prevent visiting same node twice) because we are visiting each node once and performing constant time enqueue/dequeue functions for on each node. The alternative is a brute-force traversal of tree for each level, which has a worst-case quadradic O(n<sup>2</sup>) runtime for highly skewed tree where number of levels is equal to number of nodes.

---
## Traverse BST in pre-order, in-order, post-order using recursion (DFT)

Depth-first traversal is much simpler. It results from visiting the nodes recursively. Pre- and Post-Order results from printing node before or after you recurse its left and right children:

```py
def printInorder(root):
    if root:
        printInorder(root.left)
        print(root.val),            # Print node in order
        printInorder(root.right)

def printPostorder(root):
    if root:
        printPostorder(root.left)
        printPostorder(root.right)
        print(root.val),            # Print node last, ie POST recursion

# again here is typical pre-order:
def printPreorder(root):
    if root:
        print(root.val)             # Print node first, ie PRE recursion
        printPreorder(root.left)
        printPreorder(root.right)
```

Each item is processed once during the course of traversal, which runs in O(n)
time, where n denotes the number of nodes in the tree.

---
## Traverse BST in pre-order, in-order, post-order iteratively

1. Pre-order is easy - Can turn a BFT into an iterative implementation of pre-order Depth-first Traversal (DFT) by just swapping out queue for a stack!
2. In-order
3. Post-order

**Pre-order**

```py
def printPreOrder(node):
    s = Stack()
    s.push(node)
    while not s.is_empty():
        node = s.pop()          # 1. pop
        print(node.value)       # 2. visit
        s.push(node.right)      # 3. push children
        s.push(node.left)
```

TBD: should only push non-null children onto stack

**In-order**

tbd...

**Post-order**

tbd...

---
## Get all root-to-leaf paths (eg. path sum) by building each path: (1) on way down, and (2) on way up

Compute all paths of Binary Tree with a pre-order DFT, handing approp. parent data (partial sum, path concat, etc.) off to children recursively as you go down tree. (if computing number represented by root-to-leaf paths shift number over by multiplying by base then adding next digit. If computing leaf-to-root representation, then  add next digit times base^depth to number) (EPI 9.5)

```js
function binaryTreePaths(root) {
    if (!root) return [];

    return dfs(root);
}

// post-order dfs without backtracking
function dfs(root, paths = [], curPath = []) {

    if (!root.left && !root.right) {
        paths.push([...curPath, root.val].join('->'));
	}

    if (root.left) dfs(root.left, paths, [...curPath, root.val]);
    if (root.right) dfs(root.right, paths, [...curPath, root.val]);

    return paths; // post-order!
}

// pre-order dfs with backtracking
function dfs(root, paths = [], curPath = []) {
    curPath.push(root.val); // pre-order!

    if (!root.left && !root.right) {
        paths.push([...curPath]);
	}

    if (root.left) dfs(root.left, paths, curPath);
    if (root.right) dfs(root.right, paths, curPath);

    curPath.pop(); // backtrack!

    return paths; // pass path back up
}
```

This can be bit faster by not passing results back up tree.

---
## Get all levels

```js
function getLevels(root) {
    let levels = []; // [0: [root], 1: [...], ...]

    const dft(root, levels, l) {
        if (!root)
            return

        levels[l].push(root.value);

        dft(root.left, l+1);
        def(root.right, l+1);
    }

    dft(root, 0);
    return levels;
}
```
(untested)

---
## Serialize/Deserialize a tree using DFS and BFS

* Serialization of trees:
    * if bst, serialize preorder or postorder
    * if complete bt, serialize level order
    * if full bt, store preorder + bit for leaf nodes
    * else (general bt), store preorder + marker for null pointers

```js
// serialize
function serialize(root) {
    if (!root) {
        return '#';
    }

    return [
        root.value,
        serialize(root.left),
        serialize(root.right)
    ].join(',')
}

// deserialize
// note: resist urge to pass portion of list to recursive calls!
function deserialize(id) {

    let nodes = data.split(',').reverse();

    const _dfs(){
        let cur = nodes.pop();
        if (cur === '#') {
            return null;
        }

        let root = new Node(cur)

        root.left = _dfs();
        root.right = _dfs();

        return root;
    }

    return _dfs();
}
```

---
## Find duplicate subtrees in binary tree

```js
var findDuplicateSubtrees = function(root) {

    let history = {};
    let dups = [];

    const serialize = (root) => {

        if (!root) {
            return '#';
        }

        // serialize tree
        let id = [root.val, serialize(root.left), serialize(root.right)].join(',');

        // increment count
        if (history[id]) {
            history[id]++;
        } else {
            history[id] = 1;
        }

        // only count if 2, b/c 1 is no dup, and 3+ is dup we already counted
        if (history[id] == 2) {
            dups.push(root);
        }

        return id;
    }

    serialize(root);
    return dups;
};
```

---
## Validate BST

1. Visit BST nodes in-order (i.e. sorted order).
2. If any node is less than previous node, BST is invalid.
3. Stop traversing as soon as BST is invalidated.

```js
var isValidBST = function(root) {

    let prev = Number.NEGATIVE_INFINITY,
        isValid = true;

    const inorder = (root) => {
        if (root && isValid) {
            inorder(root.left);

            if (root.val <= prev) {
                isValid = false;
            } else {
                prev = root.val;
            }

            inorder(root.right);
        }
    }

    inorder(root);
    return isValid;
};
```


---
## Build BST from sorted array

```js
function BSTFromSortedArr(arr, left, right) {

    if (left >= right) { // prob only need == here
        return null
    }

    let mid = left + Math.floor((right-left)/2);

    let node = new Node(arr[mid]);

    node.left = BSTFromSorted(arr, left, mid);
    node.right = BSTFromSorted(arr, mid+1, right);

    return node;
}
```

---
## Balance BST

1. We use DFS (in-order) to extract node values while preserving the order.
2. We build the balanced tree by recursively taking the middle element of the ordered list as root.

```js
function balanceBST(node) {
    let sortedArr = inOrderDFT(node);
    return BSTFromSortedArr(sorted);
}
```

---
## Lookup range

---
## Interval BST (eg. Book a time in calendar)

```js
function Interval(start=null, end=null){
  this.start = start;
  this.end = end;
  this.left = null;
  this.right = null;
}

Node.prototype.insertInterval = function(start,end) {

  if (this.start == null) {                     // empty tree
      this.start = start;
      this.end = end;

  } else if (start >= this.end) {               // ----this.end   start----
      if (this.right) {
          this.right.insert(start, end);
      } else {
          this.right = new Interval(start, end);
      }

  } else if (end <= this.start) {               // ----end   this.start----
      if (this.left) {
          this.left.insert(start, end);
      } else {
          this.left = new Interval(start, end);
      }

  } else {                                      // conflict!
      // handle
  }
}

function MyCalendar() {
  this.bookings = new Interval();
}

MyCalendar.prototype.book = function(start, end) {
  return this.bookings.insert(start,end);
}
```
(see [full implementation](.\..\..\javascript\trees_and_graphs\book_time.js))

---
## More Tree/BST Problems

1. Fix a BST with 2 swapped nodes. (lc 99) - perform in-order traversal, find and mark nodes in violation of bst, then fix.
1. Are 2 trees the same? (lc 100) - if roots are the same and the left and right subtrees are the same, then the trees are same.
1. Are 2 trees symmetric? (lc 101) - tree is symmetric if subtrees are mirror reflections, two trees are mirror reflections if (a) roots are same and (b) right subtree is mirror reflection of left subtree (and vis-versa).
1.

https://leetcode.com/tag/tree/

If trying to compute all paths, or find the sum/product/etc. of all numbers represented by the paths of a binary tree, should perform pre-order DFT, handing approp. parent data (partial sum, etc.) off to children recursively as you go down tree.

If computing number represented by root-to-leaf paths shift number over (at each step) by multiplying it by the base then adding new_digit, e.g., to add next bit in LSB position of binary number `x = x*2 + newbit`

(see EPI 9.5 on pg 120)

If computing leaf-to-root representation, then add new_digit*base^depth to number (at each step), e.g., to add bit in MSB position of binary number `x = x + newbit*(2**d)`, where d is 2's position of MSB (i.e., the current depth)

1. alphabet board path - see [full implementation](./../../javascript/trees_and_graphs/alphabet_board_path.js)
If computing leaf-to-root representation, then add new_digit*base^depth to number (at each step), e.g., to add bit in MSB position of binary number `x = x + newbit*(2**d)`, where d is 2's position of MSB (i.e., the current depth)

1. delete nodes - see [full implementation](javascript\trees_and_graphs\delete_nodes.js)

http://cslibrary.stanford.edu/110/BinaryTrees.html
1. Contains nearby almost duplicate - https://leetcode.com/problems/contains-duplicate-iii/submissions/ (leetcode solution incomplete)

1. Count nodes greater than all ancesters - https://leetcode.com/problems/count-good-nodes-in-binary-tree/submissions/
1. Boundary of Binary Tree - see [write-up](./../../markdown/trees_and_graphs/bt_boundary.md)

