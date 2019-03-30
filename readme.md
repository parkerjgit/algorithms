# Algorithms and Data Structures ##################################

A list of question sets grouped by problem type. Each set is preceeded by concise notes and procedes from easy to medium difficultly (a few problems that might be considered hard). The list is intended to help candidates ramp up quickly for technical interviews.

## Complexity

<details><summary>Review Performance Families</summary><br>

* Constant - c - There is no dependence on n. 
* Logarithmic - log(n) - great! grows slow as n gets big, eg Binary search.
* Linear - n - Cost of stepping through an array, ie. looking at each item once or twice (or fixed number of times)
* Superlinear (or linearithmic) - nlog(n) - grow a little faster than linear - cost of divide and conquer algorithms, eg Mergesort and Quicksort
* Quadratic - n<sup>2</sup> - cost of looking at all pairs, i.e. combinations of two items, e.g. Insertion sort and Selection sort. 
* Cubic - n<sup>3</sup> - cost of looking at all combinations of three items, eg. dynamic programming algorithms
* Exponential - c<sup>n</sup> - very bad - cost of looking at all subsets of n items, e.g. building a powerset (set of all subsets of S, including the empty set and S itself)  
* Factorial - n! - even worse - cost of looking at all purmutations of n items.

---

</details><br>

1. cost of binary search
2. cost of looking at each item once
3. cost of divide and conquer algorithms
4. cost of looking at all pairs/triples
5. cost of looking at all subsets of n items
6. cost of looking at all purmutations of n items

#### String manipulation

<details><summary>Review Notes on Javascript Strings</summary><br>

* Strings are a primative type used to represent text as sequence of [Unicode](https://unicodelookup.com/) characters. Think of them as immutable character arrays. Get the decimal value of a unicode character in a string with `str.charCodeAt()`
* You can use single quotes, double quotes, or backticks. Backtick-quoted strings, called template literals, can span lines and embed computed values using `${}`. Its [common practice](https://www.reddit.com/r/javascript/comments/4m715v/should_i_use_or/) to use single quotes for js and double quotes for jsx/html, but doesn't really matter, just be sure to escape whichever one you use (ie., escape single quotes if you use single quotes, eg., 'Hi \' ho'). 
* Strings inherit *methods* like `slice()` and `split()` from the [String.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype) object. All string methods return a new string.
* Use `indexOf("lmno");` to find first index of a character or substring.
* Use `abc[2]` to get character by index, but strings are immutable so don't use for assignment!
* Iterate over characters in a string with `for...of`.
* Find and replace strings or patterns in string with `replace("abc","123")`
* Converty to/from character code with `'c'.charCodeAt(0)` and static method `String.fromCharCode(99)`
* Javascript converts, ie *coerses*, primatives into objects when needed and behind scenes in order to perform operations that require an object, e.g. `'asdf'.length`
* Convert a string to/from an array of characters with `str.split('')` and `arr.join('')`. Convers to/from an array of words with `str.split(' ')` and `arr.join(' ')`
* Use [`str.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) to extracts a section of a string. Prefer it to `substring()` and `substr()` b/c best support for negative indexing.
* To edit a string, the [split twice then concatinate](https://stackoverflow.com/a/21350614/1525466) method is perferable to converting to an array and using `arr.splice()`. 
* Avoid [multiline string literals]() b/c a hidden space after "\" will break code, eg., "\ "! (Simpson)

---

</details><br>

Problems:

1. [Reverse a string](https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb) using iteration/recursion/built-in.
2. [Repeat a string](https://medium.freecodecamp.org/three-ways-to-repeat-a-string-in-javascript-2a9053b93a2d) using iteration/recursion/built-in.
3. [Find a substring(indexOf)](https://medium.freecodecamp.org/two-ways-to-confirm-the-ending-of-a-string-in-javascript-62b4677034ac) at begining/end/anywhere in string.
4. Merge(interleave) two strings.
5. Merge(interleave) n strings (fullstack checkpoint-foundations)
6. Wrap(rotate) a string by n places.
5. is anagram
6. is palindrome
7. get all palindromes

#### Arrays

<details><summary>Review Javascript Array Basics</summary><br>

* JavaScript has list-like objects that it calls "arrays". Unlike real arrays, elements are *Not* stored in physically contiguous locations in memory (ie., structure is not optimized for iteration), memory is *Not* preallocated and size does *NOT* grow dynamically, the way dynammically allocated arrays do. Instead, elements are simply mapped to properties on a regular object. For example, the array ['A', 'B', 'C'] is represented with an object with properties '0', '1', '2', and those properties are assigned the values 'A', 'B', 'C'.
* unlike traditional arrays, there is no enforcement or expectation that element types are homogeneous.
* Elements are accessed by index. The indices are converted to strings and used to retrieve elements by name within the object representing the array, eg. `arr[1] === arr['1']` 
* Create and initialize an array with array literal syntax, eg. `[1,2,3]`. Initializze elements in an array of size *n* to some value *v* with `Array(n).fill(v)`. Do not use the `Array()` constructor function unless you are converting an array-like structure to an array.
* Prefer constant-time `push`/`pop` (over `unshift`/`shift`) for adding/removing elements to/from the end of an array. 
* !!! Find the first index of an element in an array *by value* with `indexOf(el)`. Find index of *first* element that satisfies a *condition* with `findIndex(el=>condition)`. `indexOf())` optionally takes the index to start the search at as a second argument. `indexOf` and `findIndex()` both returns -1 if search fails, which is why is common to use `indexOf(el) >= 0` to test for inclusion, but better to just use `includes()` for that.

```js
             0  1  2
var array = [2, 9, 9];

array.indexOf(2);           // 0
array.indexOf(7);           // -1
array.indexOf(9, 2);        // 2
array.indexOf(2, -1);       // -1
array.indexOf(2, -3);       // 0
array.lastIndexOf(9);       // 2
array.lastIndexOf(7);       // -1

[4, 6, 8, 12].findIndex(el => el%2===0)     // find first even number
[4, 6, 8, 12].findIndex(isPrime)            // find first prime number
```

* Test if *every* or *any* elements in an array satisfy a condition with `every()` and `some()`. 

```js
function isPrime(num) {
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
        return false
    }
  }
  return i > 1 // prime numbers are greater than 1
}

arr.every(isPrime)          // test if every number is prime
arr.some(isPrime)          // test if any number is a prime
arr.findIndex(isPrime)      // find index of first prime number
arr.filter(isPrime)         // filter out numbers that aren't prime
```

* Arrays inherit properties and methods from the [Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) object. Prefer immutable [accessor methods]() for safety. Consider [Mutator methods]() for time/space efficiency.

* Prefer immutable `slice` (over `splice`) for removing elements safely. Avoid `delete`.

```js
// delete leaves holes
xxx
// splice mutates the array
xxx
// slice returns a new array
```

* Prefer `.includes()` over `.indexOf() >= 0` to test for inclusion. Test array-like objects with a *generic* call, `[].includes.call()`.

```js
[1,2,5].includes(2)                         // Test for inclusion like this
[1,2,5].indexOf(2) >= 0                     // not like this.
Array.prototype.includes.call([1,2,4],2)    // Make a generic call like this
[].includes.call([1,2,4],2)                 // or this.
```

* Get a new array that is the concatination two or more arrays with `[].concat(arr1, arr2, ... arrN)`. 

```js
[].concat([1,2],[3,4],[5,6])
arrays = [[1,2],[3,4],[5,6]]
// spread out input array and concat sub-arrays
[].concat(...arrays)
// filter odds out of each array and concat
[].concat(...arrays.map((arr)=>arr.filter((i)=>i%2===0))) // [2,4,6]
```

*Note, `concat` takes one or more arrays, NOT an array of arrays, so if you pass in a nested array be sure to [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) it out with `...array`.*

* Sort an array ***in-place*** with `sort()`. Use copy-and-sort method for immutable sorting, eg., `arr.slice().sort()`, or use [immutablejs](). Sort optionally takes a compare function that returns `< 1` if a < b, `> 1` if a > b, and `0` if equal.

* Implement stacks and queues *simply* with arrays. Consider implementing queues with a linked-list for constant-time dequeue/enqueue.

```js
// stack
let stack = [];
stack.push(1);           // [1]
stack.push(2);           // [1, 2]
let last = stack.pop();  // [1]
console.log(last);       // 2

// queue
let queue = [];
queue.push(1);           // [1]
queue.push(2);           // [1, 2]
let first = queue.shift();//[2]
console.log(first);      // 1
```
(from [Learn these JavaScript fundamentals and become a better developer
](https://medium.freecodecamp.org/learn-these-javascript-fundamentals-and-become-a-better-developer-2a031a0dc9cf))

* Traverse an array ...

see functional_programming section of functions_scope_and_closure.md

* Traverse a regular grid/matrix with a for loop. Traverse a jagged array with recursion. When traversing a jagged array prefer `map()` and `reduce()` over `forEach()` and `for..of` (for initial solution anyways, then consider iterative refactor to optimize for time and space). 

Applying function fn to elements in a jagged array.

```js
// the good
function foo(arr,fn) {
    return arr.map(function(el) {
        if (Array.isArray(el)) {
            return foo(el, fn)
        } else {
            return fn(el)
        }
    })
}

// the bad
function foo2(arr, fn) {
    var res = []
    arr.forEach(function(el) {
        if (Array.isArray(el)) {
            res.push(foo2(el, fn))
        } else {
            res.push(fn(el))
        }
    })
    return res;
}

// and the ugly
function foo3(arr, fn) {
    var res = []
    for (let i=0; i<arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res.push(foo2(arr[i], fn))
        } else {
            res.push(fn(arr[i]))
        }
    }
    return res;
}
```

---

</details>
<details><summary>Review Notes</summary><br>

1. *Use* for **fast iteration**. Physical contiguity on single slab of memory helps exploit the high-speed cache memory.
1. *Use* for **constant-time indexing**. Binary search also fast O(logn) *if* array is sorteddd.
1. *Use* for **space efficiency**. Only data, no links, no end-of-record info b/c fixed in size.
1. *Use* for efficient **dictionary implementation** (if keys map naturally to array indices).
1. *Consider* **dynamic array for run-time flexiblity**. Arrays are fixed in size at runtime so no append/insert/delete unless dynamically allocated.
1. Consider writing values back-to-front, or alternately, reversing the array, especially if you are removing elements or splicing (back-to-front allows you to pop from end instead of remove/shift from front).
2. Prefer overwriting and swaping to expensive insertions. (EPI 5.5)
3. Use **Parallel logic** for rows and columns??? (EPI 38)
4. Wrap (i.e. rotate) a list about kth element with `A[k:] + A[:k]`
4. Convert 2D list to 1D list with `[x for row in M for x in row]`
5. Iterate over 2D list with `[[f(x) for x in row] for row in M]`
6. Partition an array in-place by indexing the first element of each partition, steping thru unsortted elements, swaping elements into correct partition as you go. (e.g. dutch flag problem, EPI 5.1)
7. Increment number encoded as an array of digits by stepping thru array in reverse order, incrementing digits and carrying the one until there is no carry. (EPI 5.2)
8. Multiply two numbers encoded as arrays of digits by implemented long multiplication with nested for loop over reversed arrays. (EPI 5.3)
9. Check if "advancement" game board is valid by keeping track of furthest position reached-so-far and checking if any earily positions can get you further (EPI 5.4)
10. Delete duplicates from a sorted array by overwriting elements using a  cursor to keep track of write index. (EPI 5.5)
11. Find maximum spread within an array by checking the spread between each element and the min-so-far (EPI 5.6 Buy and Sell Stock once)
12. Alternate values in an array by stepping through each element pair and alternate sorting high-low and low-high, i.e. `A[i:i+2] = sorted(A[i:i+2], reverse=i%2)` (EPI 5.8)
13. Enumerate primes (i.e., > 1) ***up to n*** by initializing a bool array of size n to `[False, False] + [True]*(n-1)`, then stepping thru numbers 2 to n. If number corresponds to True, its a prime, append to result array and set multiples to False, i.e. `for m in range(i,n+1,i): is_prime[m] = False` (EPI 5.9)
14. Apply a permutation (i.e. map elements to new indices) using `A'[P[i]] = A[i]` In-place solution is NOT straight forward (see EPI 5.10)
15. Restore permutated array (i.e. look-up mapped elements) using `A[i] = A'[P[i]]`, i.e. `[A[i] for i in P]` ??Can't be right
16. To check if all items in list are same equal, prefer `a.count(a[0]) == len(a)` over `len(set(a)) == 1` for better time/space efficiency.
17. Consider mimicing an array with a hash table (with keys for indices) when indices == values for many elements, eg., when computing a random subset, to reduce space complexity. (EPI 5.14)

18. its ok and useful (e.g. recursive solution to Scramblies Kata) to slice an array/string of size 1, it returns an empy array/string, e.g. `'a'[1:] == ''` and `['a'][1:] == []`
19. its ok to create an empty range by specifying a start value >= end value, eg., `for i in range(5,2): ...`
19. Use `min([a,b],key=len)` to get shortest of two (or more) arrays.
20. Use `[int(c) for c in str(n)]` or `map(int,str(n))` to convert number into an array of digits.

---

</details><br>

1. pre-fill an array with 0's/null/range
1. pre-fill an array with letters of alphabet
1. map every element of array to another array of same size with el = fn(el), ie map to target domain, process every el w/fn
2. reduce elements of an array to single value: sum, factorial
3. simultaneously process every element in two arrays of equal/unequal size
4. implement a range function.
4. process every third element of an array of size n
5. apply/restore a permutation of an array
4. process array efficiently with single pass + hash: two/three/zero sum
4. process array with multiple pointers starting at same/op ends
5. paritition an array into 2/3 with 1/2 pointers: even/odd, dutch flag, 3-stack, lt/gt around pivot
6. delete dups from sorted/unsortted array.
7. find max spread.
5. implement stack/heap/map with an array.
6. find kth smallest (in nlogk, and n time)

#### linked-list -

<details><summary>Review Linked Lists</summary><br>

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
2. traverse iteratively/recursively
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

---

</details>

0. When should you use map/weakmap over objects.
1. When should you use set/weakset over array.
2. Convert to/from Map/Object/Nested Array and Set/Array.
1. validate a pattern, eg. validate(['tobe', 'ornot', 'tobe'], 'aba') => true
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
* Memoizing multiple args in python, use tuple. javascript, use nested array if args are positive integers.

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

<details><summary>xxx</summary><br>

1. know powers of 2 upto 10
```
2**3 = 8
2**4 = 16
2**5 = 32
2**6 = 64
2**7 = 128
2**8 = 256
2**9 = 512
2**10 = 1024
```

---

</details>

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
7. convert number to roman numeral.

see [project euler](https://projecteuler.net/archives)

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

#### Parsing