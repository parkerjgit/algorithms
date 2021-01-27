## Dictionary

Dictionaries permit access to unsortted data by key. When implemented with an array, the key is the index of the array. When implemented with a Hashtable, key is typically a string. Dictionaries generally support the following operations:

* Search(D,k) - retrieve entry by key
* Insert(D,x) - increment k and create entry with value x
* Delete(D,x) - delete entry with value x

Some also support the following:

* Max(D)/Min(D) - retrieve entry with smallest/largest key. Allows dictionary to serve as *sorted queue*.
* Predecessor(D,k)/Successor(D,k) - retrieve entry before/after key k. Allows us to iterate through dictionary.

---

[PYTHON]

1. [Python] Initialize dictionary with some characters to some default value using `dict.fromkeys('aeiou', 0)`
2. [Python] Initialize dictionary for counting letter frequencies using `dict.fromkeys(ascii_lowercase, 0)` (need to import from string)
3. [Python] Update a dict with the key/value pairs of another dict with `d1.update(d2)` (not the same as copying!)
4. [Python] Create *shallow* copy of dictionary (dicts will share a ref to mutable values!) with `d2 = d1.copy()`
4. [Python] clear entries from dict using `d.clear()` (not the same as deleting with `del`)
5. [Python] swap keys and values using `{v:k for k,v in d.items()}` (ONLY if values are unique and immutable!)
6. [Python] Use `get()` to retrieve dict item or default value if not found, eg., `d.get('a', 0)` 
7. [Python] Use `pop()` to get *and remove* item (or default value), eg., `d.pop('a',0)` (vs `popitem()` which pops next item in some unsorted order)
8. [Python] `d.keys`, `d.values` and `d.items` returns a "view" of keys, values, and key/value pairs in some consistent unsortted order.
9. [Python] Get key of max value in dictionary with `max(d.keys(), key=lambda k: d[k])` or just `max(d, key=d.get` (note: max(d) seems to do same???). If using a [Counter], prefer `c.most_common(1)[0][0]` or `c.most_common(2)[1][0]` for 2nd highest!

---

### Dictionary Implementations: Hashtable vs Red-black Tree vs Arrays

Dictionaries can be implemented with array, linked list, binary search tree (esp. Red-black trees), and trie, but most commonly and flexibly implemented with a hash table for constant lookup time by key of any immutable type, typically a string. 

> A dictionary is a general concept that maps keys to values. There are many ways to implement such a mapping. A hashtable is a specific way to implement a dictionary. Besides hashtables, another common way to implement dictionaries is red-black trees. Each method has it's own pros and cons. A red-black tree can always perform a lookup in O(log N). A hashtable can perform a lookup in O(1) time although that can degrade to O(N) depending on the input - [stackoverflow](https://stackoverflow.com/a/2061406/1525466)

Arrays are also effectively used for light-weight implementation when key naturally maps to the indexes of an array. In this case we have constant-time lookup without all the overhead of a full dictionary implementation. Note, that a "dictionary" implemented with an array is just an array, after we do a mental shift in order to think of indexes as keys. Only thing lost is constant-time insert/delete (consider trie!), so typically used when entries can be initialized and only thing changing is the values.

### asdf

---

continue with dictionary implementations on pg 73...

[Skiena, Steven S. 2012. The algorithm design manual. London: Springer.](https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1848000693/ref=sr_1_4?ie=UTF8&qid=1492123225&sr=8-4&keywords=Algorithms+in+a+nutshell)

