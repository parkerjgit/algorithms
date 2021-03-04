# Strings

1. Convert int (base 10) to string by iteratively extracting right-most digit with `x % 10` and `x // 10` (see epi 6.1)
1. Convert a string to int (base 10) by iteratively adding `10^i x next_digit` right-to-left. (see epi 6.1)
1. Convert a string to int (base 10) bit faster by reducing string left-to-right with `10*sum + next_digit`. (see epi 6.1)

[PYTHON]

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

[JAVASCRIPT]

See [js-primatives](./javascript/js-primatives.md)

---
## Palindrome checker

---
## Find substring (indexOf)

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

---
## Find longest substring with unique characters

1. Track *left* and *exclusive right* ends of slinky
2. While room to expand right:  
3. _if unique, expand slinky by advancing right
3. _if duplicate, shrink slinky by advancing left

**Javascript**

```js
function longestSubstring(str) {

  var [left, right] = [0,1];
  var longest = [left, right];    // indices of longest so far (excluding right!)

  // TODO: optimize this to use indices rather than slice
  const isRepeating = (left, right) => str.slice(left, right).includes(str[right]);

  while (right < str.length) { 

    if (isRepeating(left, right)) {
      longest = Math.max(right - left, longest[1] - longest[0])
      left++;                     // repeating, shrink slinky

    } else {
      right++;                    // not repeating, grow slinky
    }
  }
  return str.slice(...longest);   // exclude right
}
```

---
## Convert char to/from UTF-16 and Base 36 encoding.

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
## Generating random character

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

let randomChar = alphabet(Math.floor(Math.random() * 26));  // random lowercase
let randomAlphaNumeric = Math.random().toString(36)[2];     // random alpha-numeric
```

---
## Generate a random english word / and a random alpha-numeric id

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

## More Problems