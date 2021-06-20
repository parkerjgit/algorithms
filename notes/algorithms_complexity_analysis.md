## Complexity

---

asdf

---

### The RAM Model

We need a way to analyze algorithms without implementing them, ie in a language- and machine-independent way. This is done with a hypothetical computer called the Random Access Machine or RAM, where we assume each simple operation (+, *, –, =, if, call) AND each memory access take exactly one time step. We measure run time by counting up the number of steps an algorithm takes on a given problem. If our RAM executes a given number of steps per second, this converts naturally to the actual running time. (Skiena 32)

> the RAM proves an excellent model for understanding how an algorithm will perform on a real computer... Every model has a size range over which it is useful. Take, for example, the model that the Earth is flat. You might argue that this is a bad model... But, when laying the foundation of a house, the flat Earth model is sufficiently accurate that it can be reliably used. It is so much easier to manipulate a flat-Earth model that it is inconceivable that you would try to think spherically when you don’t have to. (Skiena 32)

[Skiena, Steven S. 2012. The algorithm design manual. London: Springer.](https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1848000693/ref=sr_1_4?ie=UTF8&qid=1492123225&sr=8-4&keywords=Algorithms+in+a+nutshell)

### Big 0, Big Theta, Big Omega

Technically Big O describes any upper bound, and Big Omega any lower bound. Big Theta is then the tight bound of function. If upper and lower bounds converge, then Big Theta is of course equal to Big O. But, in common usage when people use Big O they mean Big Theta regardless. (McDowell 51) Tilda notation also common way to signify approximate running time, esp. when including constants and non-dominate terms.

[McDowell, Gayle Laakmann. Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition. 2015.](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_3?ie=UTF8&qid=1492123225&sr=8-3&keywords=Algorithms+in+a+nutshell)

### Arrays and objects (java) have 24 and 16+ bytes of overhead respectively.

Chars require 2 bytes, ints/floats 4 bytes and long/doubles 8 bytes. But Array of integers does not use exactly 4N bytes because arrays have 24 bytes of overhead. Similarily, objects typically have 16 byes of overhead + padding (object uses multiple of 8 bytes).

![](http://algs4.cs.princeton.edu/14analysis/images/Date-memory.png)

[Analysis of Algorithms](http://algs4.cs.princeton.edu/14analysis/)

### A reference use 8 bytes of memory.

A reference is a memory address and thus uses 8 bytes of memory (on a 64-bit machine). So more memory is required to reference an int than is required to store an int! Also, don't forget that an inner class is essentially a class with a reference to the outer class. So a linked list node object implemented as an inner class with a pointer value requires ~ 40 bytes of memory! Compare that to the ~ 4 bytes required for an array cell.

![](http://algs4.cs.princeton.edu/14analysis/images/Node-memory.png)

[Analysis of Algorithms](http://algs4.cs.princeton.edu/14analysis/)

### String object (java) has 56 bytes of overhead

A Java string uses 32 bytes for the String object plus 24 + 2N bytes for the *referenced* char array for a total of 56 + 2N bytes.

![](http://algs4.cs.princeton.edu/14analysis/images/String-memory.png)

[Analysis of Algorithms](http://algs4.cs.princeton.edu/14analysis/)

### Only valid for sufficient large problem size

We con't care about small problem sizes.

### Drop non-dominant terms

The sum of two functions is reduced to the dominant one:

*O(f(n)) + O(g(n)) → O(max(f(n),g(n)))*

eg. *n3 + n2 + n + 1 = O(n3)*

Multiplying a function by a positive constant can not affect its asymptotic behavior:

*O(cf(n)) → O(f(n))*

When two functions in a product are increasing, both are important:

*O(f(n)) x O(g(n)) → O(f(n) x g(n))*

### Best, Avg, Worst Case

Best case is arguably not a useful concept (most algorithms have constant runtime for some input). For many algorithms Avg and Worst Case are the same. But for some they are different and worth discussing. (McDowell 52) The worst-case complexity proves to be most useful in practice because hard to define what exactly average means. (Skiena 33) However, its worth considering engineering cost of designing for worst case, ie. might be more cost-effective to design an algorithm that is sufficiently fast most of the time. 

### Performance Families

We say that a faster-growing function *dominates* a slower-growing one, just as
a faster-growing country eventually comes to dominate the laggard. (Skiena 39) Below are most important function classes in order of increasing dominance, ie decreasing efficiency:

* Constant - c - There is no dependence on n. 
* Logarithmic - log(n) - great! grows slow as n gets big, eg Binary search.
* Linear - n - Cost of stepping through an array, ie. looking at each item once or twice (or fixed number of times)
* Superlinear (or linearithmic) - nlog(n) - grow a little faster than linear - cost of divide and conquer algorithms, eg Mergesort and Quicksort
* Quadratic - n<sup>2</sup> - cost of looking at all pairs, i.e. combinations of two items, e.g. Insertion sort and Selection sort. 
* Cubic - n<sup>3</sup> - cost of looking at all combinations of three items, eg. dynamic programming algorithms
* Exponential - c<sup>n</sup> - very bad - cost of looking at all subsets of n items, e.g. building a powerset (set of all subsets of S, including the empty set and S itself)  
* Factorial - n! - even worse - cost of looking at all purmutations of n items.

#### Constant functions, f(n) = 1 

Such functions might measure the cost of adding two numbers, printing out “The Star Spangled Banner,” or the growth realized by functions such as f(n) = min(n,100). In the big picture, there is no dependence on the parameter n. (Skiena 39)

#### Logarithmic functions, f(n) = log(n) 

Logarithm is an anagram of algorithm! (Skiena p. 46)

Logarithmic time-complexity shows up typically in trees, eg. **binary search**. Such functions grow rather slowly. A logarithm is simply an inverse exponential function. Saying **b<sup>x</sup> = y** is equivalent to **x = log<sub>b</sub>(y)** is equiv. to **b log<sub>b</sub>(y) = y**. Exponential functions grow at a distressingly fast rate, but **inverse exponential functions i.e. logarithms** grow refreshingly slowly. Logarithms arise in any process where things are repeatedly halved. (Skiena p. 39)

```python
# simply recursive binary search
# using splice : to halve list
def binSearch (alist, item):
	if len(alist) == 0:
		return False
	else:
		midpoint = len(alist)//2
		if alist[midpoint]==item:
			return True
		elif item < alist[midpoint]:
			return binSearch(alist[:midpoint],item)
		else:
			return binSearch(alist[midpoint+1:],item)

# test	
print(binSearch([0, 1, 2, 12, 54, 98], 2))
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

#### Linear functions, f(n) = n 

Such functions measure the cost of looking at each item once (or twice, or ten times) in an n-element array, say to identify the biggest item, the smallest item, or compute the average value. (Skiena p. 39)

#### Superlinear (or linearithmic) functions, f(n) = nlog(n) 

This important class of functions arises in divide and conquer algorithms such as **Quicksort** and **Mergesort**. They grow just a little faster than linear (see Figure 2.4), just enough to be a different dominance class. (Skiena p. 39)

#### Quadratic functions, f(n) = n^2 

Such functions measure the cost of looking at most or all pairs of items in an n-element universe. This is the cost of employing nested for loop, e.g. looking at all cells in a n x n grid, or enumerating all combinations of elements 0,1,..n. This also arises in algorithms such as **insertion sort** and **selection sort**. (Skiena p. 39)

#### Cubic functions, f(n) = n^3 

Such functions enumerate through all triples of items in an n-element universe or the cost of nesting a for loop 3 deep, e.g. looking at each cell in a n x n x n matrix, i.e. a "Cube". This also arises in certain dynamic programming algorithms. (Skiena p. 39)

#### Exponential functions, f(n) = c^n 

For a given constant c > 1 – Functions like 2^n arise when enumerating **all subsets** of n items of any size, i.e., the ***powerset***. As we have seen, exponential algorithms become useless fast, but not as fast as factorial functions. (Skiena p. 39)

#### Factorial functions, f(n) = n! 

Functions like n! arise when generating **all permutations** or orderings of n items, e.g. generating all permutations of a list or string. (Skiena p. 39) 

Note: We say that a faster-growing function dominates a slower-growing one. When f and g belong to different classes (i.e., f(n) != Θ(g(n))), we say g dominates f when
f(n) = O(g(n)), sometimes written g >> f. 

### Polynomial Time and Complexity Classes

![](https://upload.wikimedia.org/wikipedia/commons/a/a0/P_np_np-complete_np-hard.svg)

#### P

Problems solvable in polynomial time by a *deterministic* Turing machine. *Cobham's thesis* holds that P is the class of computational problems that are "efficiently solvable" or "tractable".

https://en.wikipedia.org/wiki/P_(complexity)

#### NP

Problems solvable in polynomial time by a theoretical *non-deterministic* Turing machine.

#### NP-Hard / NP-Complete

These are the hardest problems in NP. They don't have a known algorithms that can solve them in polynomial time, so use:

* Fast heuristics with provable gaurantees
* fast exact algorithms for special cases
* exact algorithms that beat brute-force search

I don't really understand difference btw them, but that NP-Hard are at least as hard as NP-Complete.

---
[Steven S. Skiena, The Algorithm Design Manual (Santa Clara, CA: TELOS--the Electronic Library of Science, 1998).]()
[George T. Heineman, Stanley Selkow, and Gary Pollice, Algorithms in a Nutshell (Sebastopol, CA: O'Reilly, 2009).]()
[Sedgewick, Robert. Algorithms. Reading, MA: Addison-Wesley, 1988. Print.]()

see also:
[Big O Cheatsheet](http://bigocheatsheet.com/)