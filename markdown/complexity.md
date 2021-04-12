# Complexity

## Notes

* Polynomial Time:
    * Constant - c - There is no dependence on n.
    * Logarithmic - log(n) - great! grows slow as n gets big, eg Binary search.
    * Linear - n - Cost of stepping through an array, ie. looking at each item once or twice (or fixed number of times)
    * Superlinear (or linearithmic) - nlog(n) - grow a little faster than linear - cost of divide and conquer algorithms, eg Mergesort and Quicksort
    * Quadratic - n<sup>2</sup> - cost of looking at all pairs, i.e. combinations of two items, e.g. Insertion sort and Selection sort.
    * Cubic - n<sup>3</sup> - cost of looking at all combinations of three items, eg. dynamic programming algorithms
* Non-Polynomial time (use heuristics):
    * Exponential - c<sup>n</sup> - very bad - cost of looking at all subsets O(2^n) of n items, e.g. building a powerset (set of all subsets of S, including the empty set and S itself)
    * Factorial - n! - even worse - cost of looking at all purmutations of n items.

## Warm-up

1. cost of binary search
2. cost of looking at each item once
3. cost of divide and conquer algorithms
4. cost of looking at all pairs/triples
5. cost of looking at all subsets of n items
6. cost of looking at all purmutations of n items
