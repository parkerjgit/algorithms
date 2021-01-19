## Hash Tables

A hash function maps elements of a (usually super-big) universe U, like URLs, to “buckets,” such as 32-bit values. A “good” hash function satisfies two properties: (1) Its fast and easy to evaluate, (2) It spreads data out evenly (ie. it behaves like a random function). 

---

1. Use hash table for constant-time look-up, insertion, deletion.
2. If n is dynamic, we can **rehash dynamically** for a reasonable amortized cost and maintain O(1) *average* time-complexity (e.g., python dictionary)
3. For *very* dynamic applications (e.g., web caching), consider **consistent hashing** so items don't reshuffled as they do with a rehashing.

---

### Use hash table for constant-time look-up, insertion, deletion.

Designing good hash function is not easy, but given a good one like **MD5^2**, we can efficiently map to n memory locations with `h(x) mod n`, where n is number of slots provisioned, in constant time, or O(1 + n/m), where n is number of objects and m is number of slots, provided m >~ n.

### If n is dynamic, we can **rehash dynamically** for a reasonable amortized cost and maintain O(1) *average* time-complexity (e.g., python dictionary)

The **Python dictionary implementation**, is a dynamically resized hash table with the following properties: it starts out with 8 entries (PyDict_MINSIZE); if 50,000 or fewer entries, it quadruples in size when it grows; if more than 50,000 entries, it doubles in size when it grows; key hashes are cached in the dictionary, so they are not recomputed when the dictionary is resized.

https://stackoverflow.com/a/4279606/1525466

### For *very* dynamic applications (e.g., web caching), consider **consistent hashing** so items don't reshuffled as they do with a rehashing.

(see notes on consistant hashing)