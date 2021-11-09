# Hash tables

## Notes

**tbd: Review Hash Maps and Sets**

* Hash map commonly implemented with a **regular object**, but objects are **protype linked** and **keys must be strings**.
* Create a clean key/value store (ie. a dictionary or hash map) with `Object.create(null)`. The absence of an *internal prototype* removes the risk of name conflicts and you can iterate over it with `for..in` because there are no objects up the prototype chain to worry about.
* Use **Map** and **Weakmap** for improved hashing.
* A [Map]() is an iterable object that lets you store key/value pairs and traverse in-[insertion]-order.
* Unlike Objects, there is no need to use `entries()` method to iterate key/value pairs. Using `for...of` and `forEach` on a Map, returns an [key, value] array for each item in map.
* Unlike Objects, keys of a Map can be any value, including functions, objects, and any primitive.
* Careful when using an object as a key b/c the key is a reference, so do not use for multi-param memoization! Instead serialize an array.
* Unlike with objects, can get the *size* of a Map easily with the `size` property.
* A Map *may* perform better in scenarios involving frequent additions and removals. ([mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map))
* **Weakmaps** are like Maps, but keys are weakly referenced to ***prevent leaks*** and ***reduce memory consumption***.
* Unlike Map keys, WeakMap keys ***can only be objects*** AND are ***NOT iterable***.
* Use [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) for constant-time add/remove/inclusion (via `has()`) of distinct items.
* A [Set] is an *iterable* object that lets you store *unique* values of *any* type (note, unlike python sets, values are stored in *insertion* order).
* [WeakSet]() objects are like sets, but they only store *weak* references to objects, and are ***NOT iterable*** (ie., can not be iterated over).
* Set does not have a literal form. To create an empty set you must construct it with the built-in constructor function `new Set()`. If an iterable is passed, all of its elements will be added to the new Set.
* Can also pass a string, to get a set all unique chars. If want an array of unique chars just spread it out, eg., `[...(new Set('banana'))]`
* Sets and arrays are both ordered collections implemented with objects. Functionally, the difference is that sets only store unique values, and the *Set.prototype* object supports fewer methods. Notably, arrays have a *length* and sets a *size*.
* Set instances inherits `add`, `delete`, `size`, `has`, and `forEach` from the *Set.prototype* object. Use `add` and `delete` to add/remove items from set. Use `has` to test whether an item is *contained* in the set, eg., `set.has('a')`. [WeakSet.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/prototype) does not implement `size` property or any iteration methods, like `forEach`, as weaksets are not iterable.
* `has` and `delete` are *particularly* important set/weakset operations because they compute them in constant time, where as arrays require linear time. (not sure what actual performance difference is. Since both are objects, both could be constant time ops???)
* Set operations like *union*, *intersection* and *difference* are not currently implemented on Set.prototype, but are easily computed.
* Iterate over a set like you do an array, ie., with `forEach` or `for...of`. Not necessary to iterate over `mySet.keys()`, because sets are themselves enumerable.

* Find longest increasing/decreasing subsequence *in a descrete array* (EPI 16.12) by maintaining a map from item value to length of max subsequence up to item, then add entries for each item as you step thru array, using previous entries to determine max subsequence for each subsequent entry.

* A hash function maps elements of a (usually super-big) universe U, like URLs, to “buckets,” such as 32-bit values. A “good” hash function satisfies two properties: (1) Its fast and easy to evaluate, (2) It spreads data out evenly (ie. it behaves like a random function).
* Use hash table for constant-time look-up, insertion, deletion.
* Designing good hash function is not easy, but given a good one like **MD5^2**, we can efficiently map to n memory locations with `h(x) mod n`, where n is number of slots provisioned, in constant time, or O(1 + n/m), where n is number of objects and m is number of slots, provided m >~ n.
* If n is dynamic, we can **rehash dynamically** for a reasonable amortized cost and maintain O(1) *average* time-complexity (e.g., python dictionary)
* For *very* dynamic applications (e.g., web caching), consider **consistent hashing** so items don't reshuffled as they do with a rehashing. (see notes on consistant hashing)

**Orderd Map**

* Hash tables work great if you are looking up specific key, BUT you run into a problem if you need the closest key to a value, or you need the minimum key, or the minimum key that satisfies a condition, eg minimum key with non-zero value (group into consec sequences)
* If you need to look up closest key, you will be tempted to search keys using bin search for logn lookup, but you will have a problem if keys are not in sorted order. In this case consider using an array implementation of hash if key range is small. Consider a balanced tree (or just maintain a sorted link list) if not! e.g. https://leetcode.com/problems/my-calendar-i
* If you need to repeatedly find the minimum key with non-zero value, consider maintaining a sorted list of keys and index the minimum.

**Javascript Objects, Maps, and Sets**

**Python Dictionaries and Sets**

* The **Python dictionary implementation**, is a dynamically resized hash table with the following properties: it starts out with 8 entries (PyDict_MINSIZE); if 50,000 or fewer entries, it quadruples in size when it grows; if more than 50,000 entries, it doubles in size when it grows; key hashes are cached in the dictionary, so they are not recomputed when the dictionary is resized.

https://stackoverflow.com/a/4279606/1525466

**C#**

---
## Create factory takes an array of items and makes a function that returns count by item

create a function that takes an array of items and returns a hash of item counts

```js
// generic string counter, e.g., for words
const Counter = (items) => {
  let map = {};
  items.forEach(item => {
    let key = item.toLowerCase(); // TODO: strip puctuation too
    map[item] = (typeof map[item] === 'undefined')
      ? 1
      : map[item] + 1
  })
  return map;
}

// optimized counter for letters
const charCounter = (chars, lowerCase = true) => {

  // mapping fn to map char to index (case-insensative)
  const charToIdx = (c) => c.toLowerCase().charCodeAt(0) - ('a').charCodeAt(0)

  // count chars
  const arr = Array(26).fill(0);
  chars.forEach((arr,c) => arr[charIdx(c)]++);

  // return function that takes a char and returns count
  return (c) => arr[charToIdx(c)];
}

// integer counter that supports hash function to map item values to array indices
function intCounter(items, hashfn=(x)=>x) {
    let arr = [];
    for (let x of items) {
        if (!arr[hashf(x)]) {
            arr[hashf(x)] = 0;
        }
        arr[hashf(x)]++;
    }
    return (item) => arr[hashf(item)];
}
```

---
## create a contructor that constructs a Counter object that support increment and retrieval by id

```js
function Counter() {
    return {
        map: {},
        current(id) {
            return this.map[id] || 0;
        },
        incr(id) {
            this.map[id] = (this.map[id]) ? ++this.map[id] : 1;
        }
    }
}
let counter = new Counter();

// hide map
function Counter2() {
    const _map = {};
    return {
        //map: {},
        current(id) {
            return _map[id] || 0;
        },
        incr(id) {
            _map[id] = (_map[id]) ? ++_map[id] : 1;
        }
    }
}
```

---
## Find element pair/triplet/quadruplet that sums to target (2/3/4 sum problem)

find first/all pairs in array that sum to target.

```js
(arr, target) => {
  let res = [],
      history = new Map(); // element -> idx

  arr.forEach((el, idx) => { // should use .some() or for loop so easier to break out if looking only first pair!
    let complement = target - el;
    if(history.has(complement)) {
      // return [history.get(complement), idx] if only need first pair
      res.push([history.get(complement), idx])
    }
    history.set(el, idx);
  })

  return res;
}
```

find first/all triplets in array that sum to target

```js
(arr, target) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let history = new Map();
    for (let j = i + 1; j < arr.length; j++) {
      let complement = target - arr[i] - arr[j];
      if (history.has(complement)) {
        // return [i, history.get(complement), j] if only need first triplet
        res.push([i, history.get(complement), j])
      }
      history.set(arr[j], j);
    }
  }
  return res;
}
```
(see [full implementation]())

---
## Find *subarray* that sums to target

after you turn array into cummulative sum array, it becomes 2sum problem!

```js
var subarraySum = function(arr, target) {
    let history = new Map();
    let sum = 0;
    let count = 0;
    history.set(0,1);
    for (let i=0; i<arr.length; i++) {
        sum += arr[i];
        let complement = sum - target; // should prob name this left instead
        if (history.has(complement)) {
          count += history.get(complement);
        }
        history.set(sum, (history.get(sum) || 0) + 1);
    }
    return count;
}
```

---
## Find subset that sums to target (ie coin change problem)

see [Dynamic](.\..\recursion_and_dynamic\dynamic_programming.md)

---
## Find the smallest subarray that covers the target set (min-covering subarray)

```js
function minCoveringSubarr3(arr, targetSet) {
    //...

    const counts = new Map([...targetSet].map(word => [word, 0]));
    const missing = new Set([...targetSet]);

    let sub = {left: 0, right: 0};                  // current subarray
    let minSub = {left: 0, right: arr.length};      // min subarray so far

    const expand = () => {
        let itemToAdd = arr[sub.right++];

        // increment count for added item
        counts.set(itemToAdd, counts.get(itemToAdd) + 1);

        // if added an item that was missing, its no longer missing
        if (counts.get(itemToAdd) === 1) {
            missing.delete(itemToAdd);
        }

        // sub.right++;
    }

    const shrink = () => {
        let itemToRemove = arr[sub.left++];

        // decrement count for removed item
        counts.set(itemToRemove, counts.get(itemToRemove) - 1)

        // if removed last item, its now missing again
        if (counts.get(itemToRemove) === 0) {
            missing.add(itemToRemove);
        }

        // sub.left++;
    }

    const isCovering = () => missing.size === 0;

    while (sub.right < arr.length) {
      if (isCovering()) {
        minSub = (sub.right - sub.left < minSub.right - minSub.left)
            ? {left: sub.left, right: sub.right}
            : minSub;
        shrink(); // left++
      } else {
        expand(); // right++
      }
    }

    return [minSub.left, minSub.right];
}
```
(see [full implementation](./min_covering_subarray.md))

Note, implementation does not use hash table. see min_covering_subarray.js!

---
## longest distinct subarray

---
## closest repeated element in array

---
## validate repeating pattern

validate an array of words against a string pattern, eg.
isMatch(['red', 'blue'], 'aba') -> true

```js
function validateRepeatingPattern(words, codes) {

    const encode = new Map();
    const decode = new Map();

    for (let i = 0; i < Math.max(words.length, codes.length); i++) {

        let [word, code] = [
          words[i % words.length],
          codes[i % codes.length]
        ];

        // invalid cases
        const invalidates = [
            () => !encode.has(word) && decode.has(code),            // 1st occur of word, but not 1st occur of code    [red, blu] -> [a, a]
            () => !decode.has(code) && encode.has(word),            // 1st occur of code, but not 1st occur of word    [red, red] -> [a, b]
            // () => encode.has(word) && encode.get(word) !== code, // 2nd occur of word, but doesn't match encoding   [red, red] -> [a, b] (dup)
            // () => decode.has(code) && decode.get(code) !== word  // 2nd occur of code, but doesn't match decoding   [red, blu] -> [a, a] (dup)
        ];

        // invalid if any evaluates to true
        if (invalidates.some(f => f())) {
            return false;
        }

        // add new encoding
        encode.set(word, code);
        decode.set(code, word);
    }

    return true;
}

```

---
## More Problems

1. Key Cards (ordered map) - see [solution](.\..\..\javascript\hash_tables\key_cards.js)

0. When should you use map/weakmap over objects?
1. When should you use set/weakset over array?
2. Convert to/from Map/Object/Nested Array and Set/Array.
1. validate a repeating pattern, eg. validate(['tobe', 'ornot', 'tobe'], 'aba') => true
3. Count frequency of letters in a string.
5. Get a list of unique characters found in a string.
5. Count frequency of words in a sentence.
4. implement union, intersection and difference.
6. minimum covering subarray - [Solution](https://github.com/parkerjgit/algorithms/tree/master/markdown/hash_tables/min_covering_subarray.md)
7. implement a hash table with an array - [](http://www.mattzeunert.com/2017/02/01/implementing-a-hash-table-in-javascript.html)

---
## asdf
