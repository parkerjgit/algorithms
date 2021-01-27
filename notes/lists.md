## Dynamically Allocated Arrays, ie Dynamic Arrays / List

Implement dynamic sizing by **doubling array size** when out of space (copy old array into first half of new larger array, return the new, and destroy the old). Doubling takes O(n), but **amortized cost is O(1)**, so main thing lost is the guarantee that each *append* takes constant time. When reducing the size of a dynamically sized array, wait till array is 1/4 full before halving it to prevent **thrashing**!

---

1. *Use* for **quickly growing arrays** (constant-time append). 
1. *Use* for **run-time flexibility** (insert/delete in O(n))
1. *Consider* a **linked-list for faster updates**. Lists take linear-time for insertion/deletion due to element shifting (slow compared to linked data structures). 
1. *Use* for fast/efficient **stack implementation** (Prefer linked-list for queue implementation)

---

If we don't know what size we require ahead of time, we can implement dynamic sizing by doubling size when we run out of space by copying old array into first have of new array, returning the new, and destroying the old. Seems costly, but b/c array doubles after the 1st, 2nd, 4th, 8th, ... insertions, It will take log<sub>2</sub>n doublings until the array gets to have n positions, but for n elements, half never move, a quarter will move once, and each of the n elements will only move two times on *average*, so the net cost of managing the dynamic array is the same O(n) as it would have been if a single array of sufficient size had been allocated in advance! The main thing lost is the guarantee that each access takes constant time in the worst case--now all the queries will be fast, except for those relatively few queries triggering array doubling. This is called an **amortized cost**. (Skiena 67) Amortized analysis is useful when worst-case run-time per operation is too pessimistic.

[Skiena, Steven S. 2012. The algorithm design manual. London: Springer.](https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1848000693/ref=sr_1_4?ie=UTF8&qid=1492123225&sr=8-4&keywords=Algorithms+in+a+nutshell)