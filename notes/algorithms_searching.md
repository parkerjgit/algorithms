# Searching

---

* If data dynamic, consider using a heap or bst?
* If there are many searches to perform, consider preprocessing.
* If search uses sort, and sort takes the most time, reconsider sorting, ie if sort is the bottleneck, remove it!
* Must define comparison, if searching user-defined type. (EPI 144)
* When implementing bin search recursively, use two base cases: (1) target not found when l > r, and (2) target is found when a[m] == t, then recurse on (l, m-1) or (m+1, r). When implementing iteratively, search while l<=r, and test for found condition inside loop.
* When implementing bin search, midpt = L + (R - L) // 2 to prevent overflow.
* Use [bisect.bisect_left(arr,targ)](https://docs.python.org/2/library/bisect.html) rather than implementing own binary search.
* Also use **bisect_left** and **bisect_right** to find left/right insertion points into sorted array.
* Find first occurance of k in sorted array using binary search, except when value is found, don't stop searching, eliminate values to right and keep going. - EPI 11.1 145
* Find "magic index" (ie., element == index) using binary search with target value replaced by index m at each step, ie., go left when a[m] > m, and go right when a[m] < m. - EPI 11.2 146
* Search a cylindrical array for smallest value (ie., the seam) using divide and conquer, discarding the half with no seam (first < last) until l == r (== smallest). - EPI 11.3 147
* Pattern: Binary Search used in many ways by modifying the conditions for which you go left or right.

---

## Binary Search

#### Implemented with recursion:

```python
# simply recursive binary search
# using splice : to halve list
def binary_search (alist, item):

    # base case: not found
    if len(alist) == 0:
        return -1

    # recurse
    midpoint = len(alist)//2
    if alist[midpoint]==item:
        return True
    elif item < alist[midpoint]:
        return binary_search(alist[:midpoint],item)
    else:
        return binary_search(alist[midpoint+1:],item)
```
(source adapted from http://interactivepython.org/runestone/static/pythonds/SortSearch/ThebinSearch.html)

Complexity Analysis: 

for n items, approx items left after the first comparison: 
    **n/2**
Then for ith comparison:
    **n/4, n/8, n/16, ... n/2<sup>i</sup>**  
When there is just 1 item left:
    **n/2<sup>i</sup> = 1**, or **i = log n**. 
So binary search has worst case complexity: 
    **O(log n)**.

Unfortunately, while splicing list is very elegant, it does result in superlinear nlogn space complexity. We can acheive logn space complexity by passing indexes to a helper function instead of splicing.

```python
def binary_search(alist, item):

    # recursive helper
    def _search(alist, item, first, last):

        # middle element of sub-list
        middle = first + (last - first) // 2 
              
        # base case: not found  
        if first > last:
            return -1

        # base case: found    
        if alist[middle] == item:
            return middle

        # recurse left or right
        if alist[middle] > item:
            return _search(alist, item, first, middle - 1)
        else:
            return _search(alist, item, middle + 1, last)

    return _search(alist, item, 0, len(alist) - 1)

```

#### Implemented with iteration:

Recursive functions are beautiful, but there is always some overhead memory cost of call stack. In the case of binary search the call stack requires logn space. Iterative solution uses constant auxiliary space! This is best we can do.

```py
def binSearch(array, value):
    
    l = 0
    r = len(array)-1
    
    while l<=r:
        midpt = l + (r-l)//2
        if value == array[midpt]:
            return midpt
        elif value < array[midpt]:
            r = midpt-1
        else: # value > array[midpt]:
            l = midpt+1
        
    return -1
```
