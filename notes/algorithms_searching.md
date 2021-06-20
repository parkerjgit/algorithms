# Searching

---

see [markdown\searching_and_sorting\searching.md](.\markdown\searching_and_sorting\searching.md)

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
