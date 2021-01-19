## Greedy Algorithms

A greedy algorithm use heuristic to make a locally optimal choice at each step with the hope of finding or approximating a globally optimal solution in a reasonable time. 

[Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)

---

1. Greedy Algorithms are **not necessarily optimum**, but sometimes are. (eg. Coin changing problem optimum for denominations of form [1, r, r2, r3,...])
3. Often good idea to **conceptualize recursively, implement iteratively** for better performance.
4. Greedy algorithms/heuristics are often intuitive, but sometimes they aren't. (eg. xxx)
5. **Dijkstra's Algorithm** for finding **shortest paths** is a connonical example.
6. Other examples include **Prim's Algorithm** for **minimum spanning trees**, and **scheduling trees** (ie. task assignment).
7. Find majority element in linear time and constant space complexity (i.e. without using a hash map), by designating first element the majority candidate, incrementing a count on occurances and decrementing on non-occurances while count is non-zero. If count hits zero, take next item as candidate and procede. (e.g. EPI 17.5)
8. Find the "ample" city in gas-up problem by making one pass through cities, tracking gas remaining, and returning city with the min gas remaining before gassing up. (e.g. EPI 17.6)
9. Find max water trapped by an array, representing equally spaced vertical lines, by indexing first/last elements and working inward by advancing the end with the shorter line, i.e. eliminating advancements of the taller, and keeping track of max water trapped so far. (e.g. EPI 17.7)

---

### Greedy Algorithms are not necessarily optimum, but sometimes they are. 

Coin changing problem, making change with smallest number of coins, can be solved by iterative choosing largest coin less than amount remaining. This is not optimum for all denominations, eg. British Pence, came in [30, 24, 12, 6, 3, 1], but is optimum for US currency, as well as denominations of the general form [1, r, r2, r3,...].

```py
def change_making(cents):
    COINS = [100, 50, 25, 10, 5, 1]
    num_coins = 0
    for coins in COINS:
        num_coins += cents // coin
        cents %= coin
    return num_coins
```
(Aziz 262)

[Aziz, Adnan, Tsung-Hsien Lee, and Amit Prakash. 2017. *Elements of programming interviews in Python: the insiders' guide*.](https://www.amazon.com/Elements-Programming-Interviews-Python-Insiders/dp/1537713949/ref=pd_sim_14_3?_encoding=UTF8&pd_rd_i=1537713949&pd_rd_r=0SBJQRPM92W1X588SC63&pd_rd_w=vixHd&pd_rd_wg=ToyVm&psc=1&refRID=0SBJQRPM92W1X588SC63)

### Greedy algorithms/heuristics are often intuitive, but sometimes the aren't.

eg... tbd

### Dijkstra's Algorithm is a connonical example.

### Other examples include minimum spanning trees, and scheduling trees (ie. task assignment?).

