## Strings

---

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

#### Prefer manipulating a list of chars over an immutable string to improve performance. (see epi 6.1)

When building a string, we could concatenate a single character n times resulting in O(n2) time complexity. By instead building a list of chars, then converting final result to a string we acheive O(n).

```py
# string concatenation
def build_random_string(k):
    s = ''
    for _ in range(k):
        s += 'a'
    return s

# list of characters
def build_random_string2(k):
    chars = []
    for _ in range(k):
        chars.append('a')
    return ''.join(chars)

# list comprehension of characters
def build_random_string3(k): 
    return ''.join(['a' for _ in range(k)])
```

Timing the above gives less than dramatic results:

```py
def test(k):
    fns = [build_random_string,
           build_random_string2,
           build_random_string3]
    for fn in fns:
        start = time.clock()
        fn(k)
        end = time.clock()
        print(end-start)

test(10000000)
5.1062934900726304
1.3030373256644907
0.653888065033243
```

