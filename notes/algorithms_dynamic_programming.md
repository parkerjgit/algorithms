# Dynamic Programming

Dynamic Programming is a general approach similar to divide-and-conquer, but unlike divide-and-conquer, the subproblems will typically overlap. Dynamic programming can often be used to solve this class of problems in O(n2) or O(n3) for which a naive approach would take exponential time. Key insight is that if there are a polynomial number of all possible inputs and constant-time processing, then we can pre-cache all results in polynomial time.

---

* Consider DP when you need to make a series of decisions. Instead of making a logical decision, make all decisions and take the best result, e.g. finding levenstein distance (EPI 16.2 241)
* Logic most useful in **pruning the decision space**, particularily for recursive solutions, e.g., number of ways through a graph (EPI 16.3 244, Project Euler 15)
* Consider DP for counting/combinatorial problems, e.g. count number of ways through a graph (EPI 16.3 244, Project Euler 15), number of ways to run up stairs, i.e., triple step (CTCI 342)
* DP conceptually recursive but often more efficient to pre-build up whole cache bottom-up iteratively before making lookup, e.g., number of ways through a graph (EPI 16.3 244, Project Euler 15)
* Iterative solution typically more efficient, but not when recursive solution finds solution early or does a better job of pruning subproblems.
* Recursive approach typically caches with hash table or BST, iterative solutions usually use one- or multi-dimensional arrays for exhaustive caching.
* Memoization(caching) may be further optimized by recycling cache as you go, i.e., after you know there will be no more lookups, e.g. fibanacci (EPI 336)
* Be sure there are only a polynomial number of different subproblems that you are caching, e.g., if there are only two integer arguments that range
between 1 and n, then there can be at most n^2 different recursive calls!
* Memoizing multiple args in python, use tuple. javascript, use nested array if args are positive integers.

---

https://www.cs.cmu.edu/~avrim/451f09/lectures/lect1001.pdf
