# Hash tables

* A hash function maps elements of a (usually super-big) universe U, like URLs, to “buckets,” such as 32-bit values. A “good” hash function satisfies two properties: (1) Its fast and easy to evaluate, (2) It spreads data out evenly (ie. it behaves like a random function).
* Use hash table for constant-time look-up, insertion, deletion.
* Designing good hash function is not easy, but given a good one like **MD5^2**, we can efficiently map to n memory locations with `h(x) mod n`, where n is number of slots provisioned, in constant time, or O(1 + n/m), where n is number of objects and m is number of slots, provided m >~ n.
* If n is dynamic, we can **rehash dynamically** for a reasonable amortized cost and maintain O(1) *average* time-complexity (e.g., python dictionary)
* For *very* dynamic applications (e.g., web caching), consider **consistent hashing** so items don't reshuffled as they do with a rehashing. (see notes on consistant hashing)

## Javascript Objects, Maps, and Sets

## Python Dictionaries and Sets

* The **Python dictionary implementation**, is a dynamically resized hash table with the following properties: it starts out with 8 entries (PyDict_MINSIZE); if 50,000 or fewer entries, it quadruples in size when it grows; if more than 50,000 entries, it doubles in size when it grows; key hashes are cached in the dictionary, so they are not recomputed when the dictionary is resized.

https://stackoverflow.com/a/4279606/1525466

## C#

## word/char counter

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
  const charToIdx = (char) => char.toLowerCase().charCodeAt(0) - ('a').charCodeAt(0)

  // count chars
  const arr = Array(26).fill(0);
  chars.forEach((arr,char) => arr[charIdx(char)]++);

  // return function that takes a char and returns count
  return (char) => arr[charToIdx(char)];
}


```

## 2/3 sum problem

find first/all pairs in array that sum to target.

```js
(arr, target) => {
  let res = [],
      history = new Map(); // element -> idx

  arr.forEach((el, idx) => { // should use for loop so easier to break out if looking only first pair!
    let complement = target - el;
    if(history.has(complement)) {
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

## min-covering subarray

Find the smallest subarray that covers the target set

Note, below implementation does not use hash table. see min_covering_subarray.js!

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

## longest distinct subarray

## closest repeated element in array

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

## More Problems