## Data Structures

tbd

### Contiguous vs Linked structures

**Contiguously-allocated** are composed of single slabs of memory, include arrays, matrices, heaps, and hash tables

see [memory layout](https://arrow.apache.org/docs/memory_layout.html)

**Linked data structures** are composed of distinct chunks of memory tied
together by pointers, and include linked lists, trees, and graphs

### Recursive structures

Structures that remain intact when you trim or cut them are recursive in nature. Like a worm when you cut it in half and get two worms (not really), chopping the first element off a linked list leaves a smaller linked list, while splitting the first k elements off of an n element array gives two
smaller arrays, of size k and n−k, respectively. Accordingly, arrays and linked lists are recursive structures, as are trees and graphs. In contrast, hashtables and classes are non-recursive.




