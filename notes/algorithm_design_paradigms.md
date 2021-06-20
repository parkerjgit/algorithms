# Algorithm Design Paradigms and Primatives

Questions:

1. Briefly describe and give examples of four design paradigms or categories of algorithms.

---

1. **Divide and Conquer Algorithms** break up problem recursively and combine piece-meal, eg. merge sort
2. **Randomized Algorithms** use randomness to guide behaivor typically to improve average-case performance, e.g. deterministic versions of quicksort degenerates to quadradic time for some inputs. By selecting pivot points at random, quicksort can guarantee nlogn runtime for all inputs with a high probability.
2. **Greedy Algorithms** make locally optimal choice at each stage (based on some greedy heuristic) to approximate a globally optimal solution in reasonable time, eg. Dijkstra's.
3. **Dynamic Programming** is a *method* for solving a problem by breaking it down into subproblems, solving each (typ. top-down recursively), and storing their solutions, called *memoization*, e.g. fibonacci sequence, knap sack problem, etc...

---

### Divide and Conquer ####################################################

Break problem up into smaller pieces recursively and then combine solutions to subproblems piece-meal into final solution.

* Canonical Example: merge sort
* Other Examples: quicksort, multiplying large numbers (e.g. the Karatsuba algorithm)

### Randomized ###########################################################

#### Canonical Example:

Randomized Quicksort

#### Other Examples:

Primality testing
Graph Partitioning
Hashing

### Greedy Algorithms ######################################################

A greedy algorithm makes a locally optimal choice at each step with the hope of finding or approximating a globally optimal solution in a reasonable time. 

[Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)

#### Canonical Example:

Dijkstra's Algorithm

#### Relations:

min spanning trees
scheduling trees
infor coding

### Dynamic Programming #######################################################

*Dynamic Programming** is a *method* for solving a problem by breaking it down into subproblems, solving each (typ. from top-down recursively), and storing their solutions, called *memoization*. DP problems can often be further optimized as a bottom-up iterative solution that eliminate space required for call stack.

#### Canonical Example:

Knap sack problem

#### Other Examples:

genome sequence alignment
shortest path communication