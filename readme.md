# Algorithms and Data Structures ##################################

A list of question sets grouped by problem type. Each set is preceeded by concise notes and procedes from easy to medium difficultly (a few problems that might be considered hard). The list is intended to help candidates ramp up quickly for technical interviews.

#### Daily Problems

**first:**

1. count sort, bucket sort, group people by age
2. bin search
3. dft, bft
4. min covering subarray

**rest:**

1. **[Complexity](./markdown/complexity.md):** Cost of bin search, merge sort, looking at each item once, looking at all pairs/triplets/subsets/purmutations.
1. **[Strings](./markdown/arrays_and_strings/strings.md):** Palindrome checker, find a substring, find the longest substring with unique characters.
1. **[Arrays](./markdown/arrays_and_strings/arrays.md):** flatten an array, partion an array (Dutch flag problem), apply/restore a permutation of an array.
1. **[Matrices](./markdown/matrices/matrices.md):** prefill matrix, convert betwee 2d/1d array representations, traverse/transpose matrix, maze solver, paint bucket, etc. count sqr submatrices, maximal sqr, surrounded regions
1. **[Linked-List](./markdown/linked_lists/linked_lists.md):** implement with class/prototype/object/function and traverse iteratively/recursively
1. **[Trees](markdown/trees_and_graphs/trees.md):** implement BT/BST and traverse DFT/BFT iterative/recursively in pre/in/post order, is BST valid
1. **[Stack](./markdown/stacks_and_queues/stacks.md):** normalize pathnames, rpn, test for well-formed expression, implement min/max API -
1. **[Queue](markdown/stacks_and_queues/queues.md):** implement queue with array, stack, implement min/max API
1. **[Heap](./markdown/heaps/heaps.md):** implement minheap, implement priority queue, find k most frequent words, sort k sortted -
1. **Trie:** prefix search, autocomplete, sort words
1. **[Graphs](./markdown/trees_and_graphs/graphs.md):** represent graph as adjacency list, adjacency map, and adjecency matrix. traverse with DFT/BFT, determine if path/cycle exists.
1. **[Union-Find](./markdown/union_find/union_find.md):** detecting cycles in non-directed graph,
1. **[Hash Tables](./markdown/hash_tables/hash_tables.md):** word/char counter, 2/3 sum problem, longest distinct and min-covering subarray, validate pattern -
1. **[Sets and subsets]():** review [set notation](https://www.mathsisfun.com/sets/symbols.html),
1. **[Recursion](./markdown/recursion_and_dynamic/recursion.md):** flatten jagged array, dft of tree/graph, merge sort, binary search, powerset, bottom-up vs top-down recursion -
1. **[Dynamic Programming](./markdown/recursion_and_dynamic/dynamic_programming.md):** fibonacci, combination sum (find/count combinations), three-step, knapsack, count sqr submatrices, maximal sqr, longest string chain
1. **[Searching](./markdown/searching_and_sorting/searching.md):** find kth largest, implement native find using binSearch iter/recursively to accept comparitor and target value -
1. **[Sorting](markdown/searching_and_sorting/sorting.md)**: implement insertion sort, merge sort, and quick sort. sort an array of objects by prop, one array by another array, sort numbers/words (hint: trie)
1. **Math:** GCF, LCM, factorize, enum primes, factorial, fibonacci, compute subsets (powerset), combinations, permutations
1. **Divide and Conquer:** implement merge sort (bin search and quick sort can also be considered divide and conceur), tower of hanoi
1. **[Greedy](./markdown/greedy/greedy.md):** coin change, task assignment, scheduling, interval covering, ... -z
1. **Objects:** demonstrate class-based/prototypal/functional inheritance, and object delegation
1. **[Front-end](./markdown/front_end/front_end.md):** component that makes api call, and performs pagination, sort, and filter on front-end/back-end.
1. **[Functional](./markdown/functional_programming/functional_programming.md):** implement debounce, throttle, pipe, compose, memoization for single/multi params., map, filter, reduce, promisify
1. **Bit-Wise:** insert m into n, filter a collection with bitmask, ...
1. **[Backtracking](./markdown/backtracking/backtracking.md)** - for space efficiency and pruning
1. **[OOP]()** - design phone directory, design an exam room seating
1. **[Sequences and Subsequences]()** - try representing as linked list or intervals, try counting values or tails, consider invariants, ...

testing for each

#### Front-end problems

**warm-up**

1.

**problems**

1. implement pagination, sorting, and filtering on front and back-end
2. implement debounce, throttle function



#### String manipulation

see notes on [strings](notes/strings.md)

#### Arrays

see notes on [Arrays](notes/arrays.md)

#### linked-list -

see [Linked-List](./markdown/linked_lists/linked_lists.md)

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
1. implement map/filter/reduce

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

1. Write a function that turns a fn into async fn that executes after some delay following burst (debounce). Why is this useful?
2. Write a function that turns a fn into async fn that executes immediately then prevents execution until some delay following burst (debounce leading). Why is this useful?
2. Write a function that turns a fn into fn that only fires at some max rate (throttle). Why is this useful?

#### Regex

tbd...

#### Web Constructs

1. implement redux, reselect, thunk
2. implement finite state machine
