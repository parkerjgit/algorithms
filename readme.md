# Algorithms and Data Structures ##################################

A list of question sets grouped by problem type. Each set is preceeded by concise notes and procedes from easy to medium difficultly (a few problems that might be considered hard). The list is intended to help candidates ramp up quickly for technical interviews.

#### Daily Problems

1. **Complexity:** Cost of bin search, merge sort, looking at each item once, looking at all pairs/triplets/subsets/purmutations.
1. **Front-end:** component that makes api call, and performs pagination, sort, and filter on front-end/back-end.
2. **Strings:** Palindrome checker, interleave n strings, length of longest substring with unique characters
2. **Functional:** implement debounce, throttle, pipe, compose, memoization for single/multi params
3. **Linked-List:** implement with class/prototype/object/function and traverse iteratively/recursivly


#### Front-end problems

**warm-up**

**problems**

1. implement pagination, sorting, and filtering on front and back-end
2. implement debounce, throttle function

#### Complexity

1. cost of binary search
2. cost of looking at each item once
3. cost of divide and conquer algorithms
4. cost of looking at all pairs/triples
5. cost of looking at all subsets of n items
6. cost of looking at all purmutations of n items

<details><summary>Answers</summary><br>

* Polynomial Time:
    * Constant - c - There is no dependence on n.
    * Logarithmic - log(n) - great! grows slow as n gets big, eg Binary search.
    * Linear - n - Cost of stepping through an array, ie. looking at each item once or twice (or fixed number of times)
    * Superlinear (or linearithmic) - nlog(n) - grow a little faster than linear - cost of divide and conquer algorithms, eg Mergesort and Quicksort
    * Quadratic - n<sup>2</sup> - cost of looking at all pairs, i.e. combinations of two items, e.g. Insertion sort and Selection sort.
    * Cubic - n<sup>3</sup> - cost of looking at all combinations of three items, eg. dynamic programming algorithms
* Non-Polynomial time (use heuristics):
    * Exponential - c<sup>n</sup> - very bad - cost of looking at all subsets of n items, e.g. building a powerset (set of all subsets of S, including the empty set and S itself)
    * Factorial - n! - even worse - cost of looking at all purmutations of n items.

</details><br>

#### String manipulation

**Notes**

see notes on [strings](notes/strings.md)

**Warm-up**

1. Convert word into a list of chars
2. Convert sentence into list of words
3. Convert text file into list of list of lines
4. Partition string by a separator
5. Get the shortest string of a list of strings
6. Remove white space from ends of a string
7. Check if string is numeric
8. Replace characters in first string with corresponding characters in second
9. Generate a random character
10. Build a random string
1. [Reverse a string](https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb) using iteration/recursion/built-in.
2. [Repeat a string](https://medium.freecodecamp.org/three-ways-to-repeat-a-string-in-javascript-2a9053b93a2d) using iteration/recursion/built-in.
>3. [Find a substring(indexOf)](https://medium.freecodecamp.org/two-ways-to-confirm-the-ending-of-a-string-in-javascript-62b4677034ac) at begining/end/anywhere in string.
4. Merge(interleave) two strings.
5. Merge(interleave) n strings (fullstack checkpoint-foundations)
6. Wrap(rotate) a string by n places.
5. is anagram
6. is palindrome

**Medium**

7. get all palindromes
8. Convert int (base 10) to string
9. Convert a string (e.g., '340') to an int
9. [Convert english representation of a number (e.g., 'three hundred forty') to int](.\javascript\arrays_and_strings\convert_string_to_int.js)

#### Arrays

**Notes**

see notes on [Arrays](notes/arrays.md)

**Warm-up**

1. index first, exclusive middle, exclusive last elements
1. pre-fill/generate an array with 0's/null/range
1. pre-fill/generate an array with a range of numbers (implement a range function)
1. pre-fill/generate an array with letters of alphabet
2. implement zip/unzip function for two or more arrays.
3. implement union/intersection/difference for two or more arrays.
1. transform every element of an array
4. transform every third element of an array of size n
4. process a sliding window of elements in an array
4. process mirror elements in an array
>3. process corresponding elements from two or more arrays
2. reduce elements of an array to single value: sum, factorial
5. flatten a matrix or jagged 2d array.
6. flatten a deeply nested jagged array.

**Problems**

5. apply/restore a permutation of an array
5. paritition an array into 2/3 with 1/2 pointers: even/odd, dutch flag, 3-stack, lt/gt around pivot
6. delete dups from sorted/unsortted array.
4. find/count some combination of items in an array (that satisfy a condition) with single pass + hash (e.g., two/three/zero sum)
7. find max spread.
6. find kth smallest (in nlogk, and n time)
5. implement stack/heap/map with an array.

#### linked-list -

<details><summary>Review Linked Lists (5 mins)</summary><br>

1. Use for **fast update** (insertion and deletion) when you can afford the overhead (~40 bytes/node vs ~4 for an array cell)
2. Use for more **run-time flexibility**, when not simply growing array from one end.
3. Use Linked list for **simplicity and stability** of moving pointers over content.
2. Careful!: Linear random access time means updates will degrade to linear time also unless we know the location of node! (e.g. queue)
3. *Use* for fast **queue implementation**
4. A **Singly Linked List** is recursively defined as a ref to the first, or "head" node, where each node contains data and a ref to the "next" node.
5. A **Doubly Linked List** *also* contains a ref to the last, or "tail" node, and each node also contains ref to the "previous" node.
6. Traverse/Search a linked list iteratively or recursively.
7. When implementing **insert** [after], be careful to set the "next" reference of the new node first.
8. When implementing **delete** [after], just set next to the next next node.
9. Linked lists are not a standard type in python, but **collections.deque** does provide a double-ended queue (deque)
10. Consider using a "dummy head", i.e. sentinal node, to avoid having to check for empty list. (EPI 7.1)
11. Consider using two iterators, one ahead of other, or one quicker than other. (EPI 7.3)
12. Merge sorted linked lists by traversing both and appending smaller at each step until one is empty, then append rest of the other by pointing tail at `L1 or L2`
13. Reverse a sublist in single pass by keeping index of head/first node, h/f of sublist, and stepping through each node pair i/j in sublist: pointing first f at j.next, pointing j node at previous node i, and pointing head h, at j. (e.g., EPI 7.2)

---

</details>

1. implemnt linked list
>2. traverse iteratively/recursively
3. find nth to last
4. delete node in middle, given only node (not given head)
4. find cycles
4. reverse list in single pass

#### trees

<details><summary>Review Trees</summary><br>

1. **Binary trees** are linked lists with left and right pointers (plus optional parent pointer).
2. **Binary Search Tree (BST)** is a **sorted** binary tree with **no duplicates**.
3. BSTs are fast to *search* AND *update*.
4. BSTs are fundamentally recursive.
5. ***Search*** a BST by recursing left *or* right until item is found or node is null.
6. ***Insert*** into BST by recursing left or right until the empty spot is found.
7. Unlike Hash table, its easy to find ***Min/Max of BST*** (the leftmost/rightmost element in O(logn)). Of course hash table better at arbitrary lookups.
8. Both BSTs and hash tables use O(n) space (BSTs have more overhead)
8. There are two ways to traverse a BST: ***breadth-first*** (BFT) or ***depth-first*** (DFT)
9. Implement a **BST with a Queue**: enqueue root, then while queue is not empty dequeue a node and enqueue its children.
10. Can implement a DFT iteratively with a Stack: push root to stack, then while stack is not empty pop a node and push its children.
11. Better to implement a ***DFT recursively*** by recursing left AND right until no more nodes.
12. Implement In-, Pre- and Post- order DFTs by changing the order in which you visit node and recurse on children.
13. [Python] No BST implementation in stdlib. In practice, prefer [sortedcontainers.SortedList](https://pypi.python.org/pypi/sortedcontainers) over custom implementation for fast lookup and update (implemented as list of sublists but functions/performs like a balanced BST).
13. Find all paths of Binary Tree with a pre-order DFT, handing approp. parent data (partial sum, path concat, etc.) off to children recursively as you go down tree. (if computing numbers represented by root-to-leaf paths shift number over by multiplying by base then adding next digit. If computing leaf-to-root representation, then  add next digit times base^depth to number) (EPI 9.5)
14. Avoid putting mutable objects in BST or be sure to remove mutable object before updating it and adding it back. (otherwise it will be in wrong spot and lookup will likely fail!)

---

</details>

1. implement a bst/arb graph
2. traverse bst/grph with DFT, BFT iter/recursively
3. find all paths of BST. sum numbers represented by paths
4. generate all structural permutations of binary tree with n nodes - [solution](markdown\trees_and_graphs\bin_tree_structure_permutations.md)

<details><summary>More Questions</summary><br>

xxx

---

</details>

#### graphs

<details><summary>Review Graphs</summary><br>

1. A graph is a set of vertices and a set of **directed or undirected** edges (u,v).
2. **Vertices and Edges** can be decorated with weights, lengths, etc...
3. A **path** is a sequence of vertices, and the **path length** is the number of edges it traverses.
4. If there exists a path from u to v, then v is **reachable** from u.
5. A **directed acyclic graph (DAG)** is a directed graph with no cycles (note, there can still be multiple paths between vertices)
6. A *undirected* acyclic graph is a **tree**, ie. there is exactly one path between each pair of vertices.
7. A tree or graph that includes some of the nodes of a graph is called a **subtree** or **subgraph**.
7. A **spanning tree** of a graph, is a subtree that spans ALL vertices of the graph.
8. A **minimum spanning tree** (MST) is a subset of the edges that span all vertices with the minimum possible number of edges (or weight).
6. DAG vertices with no incoming or outgoing edges are called **sources** and **sinks** respectively.
7. A **topological ordering** of vertices in a DAG is such that each edge is from a vertex earlier in the ordering to a vertex later in the ordering.
8. cont. on EPI pg 276 with basic concepts...
9. A graph can be implemented using an **adjacency list/map** or an **adjacency matrix**. OK, you *could* also use a linked list structure but ONLY for acyclic connected graphs (*basically* trees), otherwise which node is the root and what if graph is not connected?
10. If each vertice has at most one edge, implement the **adjacency map** with a dictionary where key/value pairs correspond to u,v edge pairs (or better yet, ***use an array*** if vertices map to array indices) (see EPI 277.)
11. If vertices have multiple edges can still use dict, where dict values are lists of tuples corresponding to outgoing edges, or alternatively, maintain seperate lists of vertices and edges. May have to use multiple representations for more complex problems.
12. If using graph to model a grid, or if graph is highly connected, consider an adjacency matrix.
10. graphs are ideal for modeling **binary relationships between pairs of objects**
11. Graphs are natural for **spatial relationships**, but consider them more generally for any binary relationship between objects (e.g. links, followers, wins/losses etc.)
12. Prefer **DFS** for graph problems that entail analyzing sturcture (e.g. looking for cycles or strong (ie directed) connected components or topological ordering of a DAG)
13. Prefer **BFS** for optimization problems (e.g. shortest path, minimum spanning tree, weak (ie undirected) connected components etc.), which often involve computing dist from start vertex.
14. DFS and BFS both compute in linear time **O(m + n)** for m edges and n vertices (or nodes)

http://brianvanderplaats.com/cheat-sheets/Graph-Data-Structure-Cheat-Sheet.html

---

</details>

4. represent graph as adjacency list, adjacency map, and adjecency matrix.
2. traverse graph with DFT and BFT
5. determine if path exists between two nodes in a cyclic graph. (EPI 18 can team A beat team B) - [Solution]()
6. determine if cycle exists in a directed/undirected graph. (EIP 18.4 Deadlock detection) - [Solution](https://github.com/parkerjgit/algorithms/blob/master/markdown/trees_and_graphs/has_cycles.md)

<details><summary>More Questions</summary><br>

1. Maze solver (EPI 18.1 Search a Maze)
2. Implement paint bucket (EPI 18.2 - paint a boolean matrix)
4. find the shortest path from a node to all other nodes in a directed graph.

---

</details>

#### grids and jagged/nested arrays

pre-fill a grid with 0's/null/objects

1. traverse matrix
2. transpose matrix
3. represent matrix as hash table of values indexible by row, col??
4. process every cell in a row/col
5. flatten matrix into 1d representation

#### objects and classes (and RORO)

<details><summary>Review Objects</summary><br>

yyy

---

</details>

1. implement

#### hash maps and sets

<details><summary>Review Hash Maps and Sets</summary><br>

* Hash map commonly implemented with a **regular object**, but objects are **protype linked** and **keys must be strings**.
* Create a clean key/value store (ie. a dictionary or hash map) with `Object.create(null)`. The absence of an *internal prototype* removes the risk of name conflicts and you can iterate over it with `for..in` because there are no objects up the prototype chain to worry about.
* Use **Map** and **Weakmap** for improved hashing.
* A [Map]() is an iterable object that lets you store key/value pairs and traverse in-[insertion]-order.
* Unlike Objects, there is no need to use `entries()` method to iterate key/value pairs. Using `for...of` and `forEach` on a Map, returns an [key, value] array for each item in map.
* Unlike Objects, keys of a Map can be any value, including functions, objects, and any primitive.
* Careful when using an object as a key b/c the key is a reference, so do not use for multi-param memoization! Instead serialize an array.
* Unlike with objects, can get the *size* of a Map easily with the `size` property.
* A Map *may* perform better in scenarios involving frequent additions and removals. ([mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map))
* **Weakmaps** are like Maps, but keys are weakly referenced to ***prevent leaks*** and ***reduce memory consumption***.
* Unlike Map keys, WeakMap keys ***can only be objects*** AND are ***NOT iterable***.
* Use [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) for constant-time add/remove/inclusion (via `has()`) of distinct items.
* A [Set] is an *iterable* object that lets you store *unique* values of *any* type (note, unlike python sets, values are stored in *insertion* order).
* [WeakSet]() objects are like sets, but they only store *weak* references to objects, and are ***NOT iterable*** (ie., can not be iterated over).
* Set does not have a literal form. To create an empty set you must construct it with the built-in constructor function `new Set()`. If an iterable is passed, all of its elements will be added to the new Set.
* Can also pass a string, to get a set all unique chars. If want an array of unique chars just spread it out, eg., `[...(new Set('banana'))]`
* Sets and arrays are both ordered collections implemented with objects. Functionally, the difference is that sets only store unique values, and the *Set.prototype* object supports fewer methods. Notably, arrays have a *length* and sets a *size*.
* Set instances inherits `add`, `delete`, `size`, `has`, and `forEach` from the *Set.prototype* object. Use `add` and `delete` to add/remove items from set. Use `has` to test whether an item is *contained* in the set, eg., `set.has('a')`. [WeakSet.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/prototype) does not implement `size` property or any iteration methods, like `forEach`, as weaksets are not iterable.
* `has` and `delete` are *particularly* important set/weakset operations because they compute them in constant time, where as arrays require linear time. (not sure what actual performance difference is. Since both are objects, both could be constant time ops???)
* Set operations like *union*, *intersection* and *difference* are not currently implemented on Set.prototype, but are easily computed.
* Iterate over a set like you do an array, ie., with `forEach` or `for...of`. Not necessary to iterate over `mySet.keys()`, because sets are themselves enumerable.

* Find longest increasing/decreasing subsequence *in a descrete array* (EPI 16.12) by maintaining a map from item value to length of max subsequence up to item, then add entries for each item as you step thru array, using previous entries to determine max subsequence for each subsequent entry.

---

</details>

0. When should you use map/weakmap over objects?
1. When should you use set/weakset over array?
2. Convert to/from Map/Object/Nested Array and Set/Array.
1. validate a repeating pattern, eg. validate(['tobe', 'ornot', 'tobe'], 'aba') => true
3. Count frequency of letters in a string.
5. Get a list of unique characters found in a string.
5. Count frequency of words in a sentence.
4. implement union, intersection and difference.
6. minimum covering subarray - [Solution](https://github.com/parkerjgit/algorithms/tree/master/markdown/hash_tables/min_covering_subarray.md)
7. implement a hash table with an array - [](http://www.mattzeunert.com/2017/02/01/implementing-a-hash-table-in-javascript.html)

#### recursion

<details><summary>Review</summary><br>

yyy

---

</details>

1. top down / bottom up
1. fibonici
1. 3 step
2. coin change
3. flatten nested arrays (implement Array.prototype.flat())
4. traverse jagged tree
7. Implement JSON.stringify (supports complex nested objects/arrays)

#### dynamic programming

<details><summary>Review Notes</summary><br>

* Consider DP when you need to make a series of decisions. Instead of making a logical decision, make all decisions and take the best result, e.g. finding levenstein distance (EPI 16.2 241)
* Logic most useful in **pruning the decision space**, particularily for recursive solutions, e.g., number of ways through a graph (EPI 16.3 244, Project Euler 15)
* Consider DP for counting/combinatorial problems, e.g. count number of ways through a graph (EPI 16.3 244, Project Euler 15), number of ways to run up stairs, i.e., triple step (CTCI 342)
* DP conceptually recursive but often more efficient to pre-build up whole cache bottom-up iteratively before making lookup, e.g., number of ways through a graph (EPI 16.3 244, Project Euler 15)
* Iterative solution typically more efficient, but not when recursive solution finds solution early or does a better job of pruning subproblems.
* Recursive approach typically caches with hash table or BST, iterative solutions usually use one- or multi-dimensional arrays for exhaustive caching.
* Memoization and tabulation may be further optimized by recycling cache as you go, i.e., after you know there will be no more lookups, e.g. fibanacci (EPI 336). When tabulating data, always consider how much history you need to calculate each data point (often you only need previous data point, so recycle! )
* Be sure there are only a polynomial number of different subproblems that you are caching, e.g., if there are only two integer arguments that range
between 1 and n, then there can be at most n^2 different recursive calls!
* Memoizing multiple args in python, use tuple. javascript, use nested array if args are positive integers, or use stringfied array as key. May be tempting to use Maps with arrays as keys but using mutable objects as keys will lookup the reference not the value, which will not work. Need to create hash from the value and easiest way to do that is stringify it.

---

</details>

0. nth number in fibonacci sequence using top down/bottom-up. Optimize space.
1. calculate the number of ways through a Matrix, up a flight of stairs, etc.
2. knapsack problem.
3. levenstein distance.

#### greedy algorithms

#### divide and conquer

#### Set/Weakset

1. Review Set/Weaksets
2. What are use cases
1. implement union, intersection and difference.

#### Map/Weakmap

https://dev.to/kepta/javascript-underdogs-part-1---the-weakmap-4jih

#### Math, Counting and Combinatorics

**warm-up**

1. [Factorialize a number](https://medium.freecodecamp.org/how-to-factorialize-a-number-in-javascript-9263c89a4b38)
2. Find GCF
3. Find LCM
4. Factor a number
4. Enumerate primes upto n
5. Is power of
6. Xth greatest
6. Two/Three sum to provided value.
5. Compute Factorial iterative/recursive
6. Compute Fibonaci iterative/recursive
7. generate range of numbers/characters
1. Most Common Letter.
2. Number of repeating letters.
3. Compute powerset
4. compute permutations of size n
5. compute permutations of all subsets
4. choose 1 combinations, eg., pairs, thriples, etc.

**problems**

1. convert number to roman numeral.
2. more problems: [project euler](https://projecteuler.net/archives)

#### Searching

<details><summary>Review Notes</summary><br>

* If data **dynamic**, consider using a heap or bst?
* If there are many searches to perform, consider **preprocessing**.
* If search uses sort, and sort takes the most time, reconsider sorting, ie if sort is the bottleneck, remove it!
* Must define comparison, if searching user-defined type. (EPI 144)
* When implementing bin search recursively, use two base cases: target is not found  when l > r, and (2) target is found when a[m] == t, then recurse on (l, m-1) or (m+1, r) so search midpt twice!
* When implementing bin search iteratively, search while l<=r, and test for found condition inside loop, so that don't have to test if found when loop breaks.
* When implementing bin search, midpt = L + (R - L) // 2 to prevent overflow.
* Use [bisect.bisect_left(arr,targ)](https://docs.python.org/2/library/bisect.html) rather than implementing own binary search.
* Also use **bisect_left** and **bisect_right** to find left/right insertion points into sorted array.
* Find first occurance of k in sorted array using binary search, except when value is found, don't stop searching, eliminate values to right and keep going. - EPI 11.1 145
* Find "magic index" (ie., element == index) using binary search with target value replaced by index m at each step, ie., go left when a[m] > m, and go right when a[m] < m. - EPI 11.2 146
* Search a cylindrical array for smallest value (ie., the seam) using divide and conquer, discarding the half with no seam (first < last) until l == r (== smallest). - EPI 11.3 147
* Pattern: Binary Search used in many ways by modifying the conditions for which you go left or right.

---

</details>

0. how to index mid pt btw arbitrary left/right indices?
1. Implement native find using binSearch iter/recursively to accept comparitor or target value
2. Find first occurance of shortest word, of longest even word, of word with most repeating characters, etc... (hint: reduce or index one array with transformed array)
3. Find Kth largest element.

#### Sorting

<details><summary>Review Notes</summary><br>

1. Sort to preprocess collection to make searching faster.
2. Sort to identify like items.
3. Naive Sorting algorithms run in O(n<sup>2</sup>), e.g., bubble sort, selection sort, insertion sort.
4. Fast Sorting algorithms run in O(nlogn), e.g., heapsort, merge-sort, and quicksort.
3. For some inputs, its possible to beat O(nlogn) with custom sorting routine, e.g., using min-heap to sort items known to be at most k places from final location in O(nlogk).
4. For some inputs, its possibe to sort in O(n), e.g., for a small number of values or small range of values, e.g., ??? (see epi 181)
5. [python] Sort a list in-place with sort() *method*. (see python_sorting.md)
6. [python] Get a new sorted list from an iterable using the sorted() *function*. (see python_sorting.md)
7. [python] Sort non-comparable objects by passing a function to keyword argument "key", that maps complex objects (classes, tuples, etc.) to objects that *are* comparable (integers, strings, etc.). (see python_sorting.md)
8. [python] Sort class objects implicitly by implementing a compare dunder method `__lt__`
9. Find intersection of two sorted arrays by indexing start of both arrays and testing indexed elements for equality. If equal, append to result and advance both, otherwise advance smaller. Do until one or both arrays are exhausted. (see EPI 13.1 182)
10. Merge two sorted arrays (if one has enough empty spaces at end to hold the other) by filling buffered array back to front with merged elements starting at m + n + 1, where m and n are the number of elements in first and second array. (see EPI 13.2 183, CTCI 396)

---

</details>

2. Implement a Quadradic and a Superlinear Time sort.
3. sort a lot of integers
4. Sort words by word length.

#### Bit Manipulation

**warm-up**

1. Bitwise left shift is equiv to what arithmetic operation?
2. Bitwise right shift is equiv to what arithmetic opertion?
3. What is the difference between complement operator `~` and two's complement?
4. Negate an integer.
5. Index an array back-to-front.
4. Leave a bit unchanged (using logical AND, OR, and XOR).
5. Turn a bit on/off.
7. Flip a bit.
8. Check state of a bit.
9. Slide bit into place n.
10. Create n ones's (for mask).
10. Update (ie set) a bit.
10. Check if number is even/odd.
11. Swap a bit using XORs.
12. Filter a Collection with a bit mask.
13. Clear lowest set bit.
14. Isolate lowest set bit.
15. Add bit to LSB of binary number.
16. Add bit to MSB of binary number.

**problems**

tbd...

#### Parsing

#### Fuctional

**daily**

**warm-up**

1. implement pipe, compose, etc. etc.
2. implement function that returns the identity function for an input value
3. implement function that returns input function with args reversed
2. implement debounce, debounce leading, etc.
3. implement throttle function
5. implement memoization for single/multi params

1. Write an identity function that takes an argument and returns that argument, e.g., `identity(3) // 3`
2. Write three binary functions, add , sub, and mul, that take two numbers and return their sum, difference, and product, e.g., `add(3, 4) // 7`
3. Write a function that takes an argument and returns a function that returns that argument, i.e., identity function factory, e.g., `identityf(1)() // 1`
4. Write a function curry that takes a binary function and an argument, and returns a function that can take a second argument, e.g., `curry(mul, 5)(6) // 30`
5. Write a function curryr that takes a binary function and a second argument, and returns a function that can take a first argument, e.g., `curryr(sub, 1)(7) // 6`
6. Write a function liftf that takes a binary function, and makes it callable with two invocations, e.g. `liftf(mul)(5)(6) // 30`
>7. Write a function twice that takes a binary function and returns a unary function that passes its argument to the binary function twice, e.g., `twice(mul)(11) // 121`
8. Write a function composeu that takes two unary functions and returns a unary function that calls them both, e.g. `composeu(double, square)(5) // 100`
9. Write a function composeb that takes two binary functions and returns a function that calls them both, e.g. `composeb(add, mul)(2, 3, 7) // 35`
10. Write a limit function that allows a function to be called a limited number of times before returning undefined, e.g. `let add_once = limit(add, 1)`
11. Write a from factory that produces a generator that will produce a series of values, e.g., `let next = from(0); next() // 0`
12. Write a to factory that takes a generator and an end value, and returns a generator that will produce numbers up to but not including that limit, e.g., `let next = to(from(2), 3); next() // 2; next() // undefined`
13. Write an element factory that takes an array and a generator and returns a generator that will produce elements from the array, e.g., `let next = element(["a", "b", "c", "d"], fromTo(1, 3)); next() // a`
14. Modify the element factory so that the generator argument is optional. If a generator is not provided, then each of the elements of the array will be produced, e.g., `let next = element(["a", "b", "c", "d"]); next() // a`
15. Write a collect factory that takes a generator and an array and produces a generator that will collect the results in the array, e.g., `let next = collect(fromTo(0, 2), array)`
16. Write a filter factory that takes a generator and a predicate and produces a generator that produces only the values approved by the predicate. `let next = filter(fromTo(0, 5), x=>x%2==0)`
17. Write a concat factory that takes two generators and produces a generator that combines the sequences, e.g., `let next = concat(fromTo(0, 3), fromTo(0,2))`
18. Write a repeat function that takes a generator and calls it until it returns undefined, e.g., `repeat(collect(fromTo(0, 4), array))`
19. Write a map function that takes an array and a unary function, and returns an array containing the result of passing each element to the unary function (use the repeat function), e.g., `map([2, 1, 0], inc) // [3, 2, 1]`
20. Write a reduce function that takes an array and a binary function, and returns a single value (use the repeat function), e.g., `reduce([2, 1, 0], add) // 3`
21. Make a symbol factory that makes a unique symbol generator, e.g., `let next = gensymf("G"); next() //'G1'; next() // 'G2'`
22. Write a symbol factory that takes a factory function and a seed, e.g., `let gensymf = gensymff(from, 1); let next = gensymf("G")`
23. Make a fibonacci factory that returns a generator that will produce the fibonacci sequence, e.g., `let next = fibonaccif(0, 1);`
24. Write a counter constructor that returns an object containing two functions that implement an up/down counter, hiding the counter, e.g., `let {up, down} = counter(10); up() // 11; down() // 10`
25. cont...

Most warm-up questions taken from: The Good Parts of Javascript and the Web, Frontend Masters Workshop, by Douglas Crawford, accessed on Lynda.com 6/30/2018

**problems**

1. tbd...

#### Regex

tbd...

#### Web Constructs

1. implement redux
2. implement finite state machine
