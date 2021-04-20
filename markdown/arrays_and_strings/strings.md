# Strings

## Notes

1. Convert int (base 10) to string, e.g. 340 -> '340' (implement toString), by iteratively extracting right-most digit with `x % 10` and `x // 10` (see epi 6.1)
1. Convert a string to int (base 10), e.g., '340' -> 340 (implement parseInt), by iteratively adding `10^i x next_digit` right-to-left. (see epi 6.1)
1. Convert a string to int (base 10) bit faster by reducing string left-to-right with `10*sum + next_digit`. (see epi 6.1)
1. When testing string transforms, look for invariants and consider testing seperately, eg. LR Transform

**Python**

1. convert string to list by simply casting to list: `list('asdf')`
2. split space-separated substrings into list with `'asdf a s fd lkj'.split()`
3. split lines into list with `s.split(\n)` or `s.splitlines()`
3. split comma-seperated substrings into list with `'a,b,c,d'.split(',')`
4. Use `s.partition(sep)` to partition s into (before, sep, after) tuple
4. Use `min([s1,s2],key=len)` to get shortest of two (or more) strings, eg., when interleaving two strings.
5. Use `sep.join(iter)` to concat strings in iterable with seperator.
5. Use `s.strip()` to remove white space from ends, use `''.join(s.split())` to [remove all white space](https://stackoverflow.com/questions/8270092/remove-all-whitespace-in-a-string-in-python). `s.replace(' ','')` will also work, BUT only for spaces, NOT TABS and NEWLINES. Use slower `re.sub()` for stranger cases.
6. `isdecimal()` `isdigit()` and `isnumeric()` are increasingly specific ways to test for integers. see [docs](https://docs.python.org/3/library/stdtypes.html#str.isdecimal) for difference.
7. use `s.translate(str.maketrans('abc','123'))` to replace all chars in first string with corresponding chars in second.

1. Check if set is a subset of another set with a set subtraction, eg., `len(Counter(s1) - Counter(s2)) == 0` if s1 chars are a subset of s2 chars. (see [Scramblies Kata](https://www.codewars.com/kata/55c04b4cc56a697bb0000048/solutions/python))
1. Generate a random character with `random.choice(string.ascii_lowercase)` or `chr(random.randint(ord('a'), ord('z')))`
1. Prefer manipulating a list of chars over an immutable string to improve performance. (see epi 6.1)

**Javascript**

See [js-primatives](./javascript/js-primatives.md)

---
## Warm-up

1. Convert word/sentence/file into a list of chars/words/lines
    ```js
    word.split('');
    sentence.split(' ');
    file.split('\n');
    ```
1. Get the shortest string of a list of strings
    ```js
    strings.slice(1).reduce((shortest, next) => (next.length < shortest.length) ? next : shortest, strings[0])
    ```
1. Normalize a string for comparison
    ```js
    str
      .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '') // strip punctuation
      .replace(/\s{2,}/g," ") // remove double spaces
      .trim() // Remove white space from ends
    ```
1. Check if string is numeric with/without regex
    ```js
    !isNaN(str)
    /^[0-9]+$/.test(str)
    ```
1. Check if string is alphabetic with/without regex
    ```js
    str.split('').every(char => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122)
    !/[^a-z]/i.test(str)
    ```
1. Generate a random character
    ```js
    String.fromCharCode(Math.random() * 25 + 97)
    ```
1. Build a random n-length string
    ```js
    [...Array(n)].map( _ => getRandomChar()).join('')
    ```
1. [Reverse a string](https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb) using iteration/recursion/built-in.
    ```js
    xxx
    ```
1. [Repeat a string](https://medium.freecodecamp.org/three-ways-to-repeat-a-string-in-javascript-2a9053b93a2d) using iteration/recursion/built-in.
    ```js
    xxx
    ```
1. [Find a substring(indexOf)](https://medium.freecodecamp.org/two-ways-to-confirm-the-ending-of-a-string-in-javascript-62b4677034ac) at begining/end/anywhere in string.
    ```js
    xxx
    ```
1. Merge(interleave) two strings, n strings (fullstack checkpoint-foundations)
    ```js
    xxx
    ```
1. Wrap(rotate) a string by n places.
    ```js
    xxx
    ```
1. Compute Run-length encoding of a string, eg. `'aabbbcccc' -> 'a2b3c4'`
    ```js
    xxx
    ```
1. sort words in sentence -
    ```js
    str.split(' ').toLowerCase().stripPunctuation().sort().join(' ')
    ```
1. sort chars in a string
    ```js
    str.toLowerCase().split('').sort().join('')
    ```
1. check that subsequence exists in a string
    ```js
    xxx
    ```

---
## Is x a subsequence of y

```js
var isSubsequence = function(subseq, str) {
    let i = 0;
    for (let ch of str) {
        if (ch == subseq[i]) {
            if (i == subseq.length - 1) {
                return true;
            }
            i++;
        }
    }
    return false;
};

var isSubsequence = function(subseq, str) {
  let [i,j] = [0,0];
  while (i < str.length) {
    if (str[i] = subseq[j]) {
      if (j == subseq.length - 1) return true;
      i++; j++;
    } else {
      i++;
    }
  }
  return false;
}
```
---
## Validate Palindrome

1. get exclusive middle index
2. iterate 0 to exclusive middle, for each step:
3. _if el at i not equal to its complement (at len - 1 - i), not a palindrome

---
## Validate anagrams

```js
sortStr = (str) => str.split('').sort().join('');
isAnagram = (a,b) => sortStr(a) === sortStr(b);
```

---
## Validate LR Transform

pattern: define multiple independant invariants and check each.

```js
function canTransform(start, end) {

  // L's and R's must be in same relative position.
  const invariant1 = (start, end) => {...}

  // each "L" can only have moved left
  const invariant2 = (start, end) => {...}

  // each "R" can only have moved right
  const invariant3 = (start, end) => {...}

  return [invariant1, invariant2, invariant3].every(f=>f(start, end))
}
```
see [full implementation](./../../javascript/arrays_and_strings/validate_lr_strings.js)

---
## Find substring (indexOf) - 5 min

1. Use nested for loop to slide a window along string looking for substring match
2. Break out of substring pattern match as soon as possible.
3. Return first match found.

```js
function indexOf(str, substr) {
  for(var i = 0; i < str.length - substr.length; i++) {
    for(var j = 0; j < substr.length; j++) {

      if (str[i + j] !== substr[j]) { // not it.
        break;
      }

      if (j === substr.length - 1) { // found it!
        return i;
      }
    }
  }
   return -1;
}
```

Note:
*  for sliding window iterate from 0 - to - **arr length - window length**

---
## Find longest substring with unique characters - 5 min

1. Track *left* and *exclusive right* ends of slinky
2. While room to expand right:
3. _if unique, expand slinky by advancing right
3. _if duplicate, shrink slinky by advancing left

**Javascript**

```js
function longestSubstring(str) {

  var [left, right] = [0,1];
  var longest = [left, right];    // indices of longest so far (excluding right!)
  var included = new Set();

  // const isRepeating = (left, right) => str.slice(left, right).includes(str[right]);
  const isRepeating = (right) => included.has(str[right])

  while (right < str.length) {

    if (isRepeating(right)) {
      longest = Math.max(right - left, longest[1] - longest[0])
      included.remove(str[left]);
      left++;                     // repeating, shrink slinky

    } else {
      included.add(str[right]);
      right++;                    // not repeating, grow slinky
    }
  }
  return str.slice(...longest);   // exclude right
}
```

Notes:
* Greedy algorithm, compare with other slinky problems

---
## Convert char to/from UTF-16 and Base 36 encoding - 2 min

Typical to use UTF-16 to encode alpha-numeric characters in javascript, but Base 36 or hexatridecimal is also useful b/c digits are represented with numerals 0-9 and letters a-z, so for example its very easy to generate a random alpha-numeric id.

```js
('a').charCodeAt(0) // 97
('z').charCodeAt(0) // 122

String.fromCharCode(97) // 'a'
String.fromCharCode(122) // 'z'

parseInt('a', 36) // 10
parseInt('z', 36) // 35

(10).toString(36) // 'a'
(35).toString(36) // 'z'
```

---
## Generating random character - 3 min

```js
let alphabet = 'abcdefghijklmnopqrstuvwxyz';                // 'abc...z'

let alphabet =
  [...Array(36).keys()]                                     // [0, 1, ...35]
    .splice(10)                                             // [10, 11, ...35]
    .map(i=>i.toString(36))                                 // ['a','b', ...'z']
    .join('');                                              // 'abc...z'

let alphabet =
  [...Array(123).keys()]                                    // [0,1, ...122]
    .slice(97)                                              // [97,98, ...122]
    .map(i=>String.fromCharCode(i))                         // ['a','b', ...'z']
    .join('');                                              // 'abc...z'

let randomLetter = alphabet[Math.floor(Math.random() * 26)];  // random lowercase
let randomLetter = String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0));  // better

let randomAlphaNumeric = Math.random().toString(36)[2];     // random alpha-numeric
```

---
## Generate a random english word / and a random alpha-numeric id -  2 min

Prefer manipulating a list of chars over an immutable string to improve performance. (see epi 6.1)

When building a string, we could concatenate a single character n times resulting in O(n2) time complexity. By instead building a list of chars, then converting final result to a string we acheive O(n).

```py
# string concatenation
def build_random_string(k):
    s = ''
    for _ in range(k):
        s += randomChar()
    return s

# list of characters
def build_random_string2(k):
    chars = []
    for _ in range(k):
        chars.append(randomChar())
    return ''.join(chars)
```

```js
[...Array(n)].map( _ => randomChar()).join('')    // Better yet
```

---
## More Problems

1. Convert int (base 10) to string (e.g. 340 -> '340') (implement toString)
2. Convert a string (e.g., '340' -> 340) to an int (implement parseInt)
3. [Convert english representation of a number (e.g., 'three hundred forty' -> 340 ) to int](.\javascript\arrays_and_strings\convert_string_to_int.js)
4. Group anagrams - see [solution](./../../javascript/arrays_and_strings/group_anagrams.js)

tokenize string to be decoded
