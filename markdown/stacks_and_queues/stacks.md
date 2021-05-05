# Stacks

## Notes

* Stacks and Queues and great when its ok to black box the data (i.e., no search or arbitrary access). Stacks are best when order really doesn't matter.
* Use *Push* and *Pop* to insert/remove items from a stack, *Peek* to get top without removing. Theses are constant time `O(1)` operations!
* Stacks can be implemented using either arrays or linked lists. Arrays are preferable b/c less overhead (and push/pop already avail on Array.prototype)
* Stack can also be implemented with queues. why?
* Applications of Stacks:
  * Balancing of parentheses in an expression (Dijkstra's two-strack algorithm)
  * Infix to Postfix /Prefix conversion
  * Redo/undo in applications.
  * Forward/backward in web browsers
  * Used in many algorithms like Tower of Hanoi, tree traversals, stock span problem, histogram problem.
  * Other applications incl. Backtracking, Knight tour problem, rat in a maze, N queen problem and sudoku solver

[Stack Data Structure, GeeksforGeeks](http://cdngquiz.geeksforgeeks.org/stack-data-structure/)

---
## Implement stack

```js
// arrays already implement stack api
let myStack = [];

// if we want to expose an api and decouple implementation
function Stack() {
  _data: [],
  return {
    push(val) { return this._data.push(val) },
    pop() { return this._data.pop() }
  }
}

// if we don't want to store methods on each object, e.g. if we need lots of stack instances
tbd...
```
---
## Normalize pathnames

1. Process parts of pathname left-to-right:
2. _if `'..'`, **pop** stack
3. _if `'.'`, ignore
4. _else its a directory/file name, e.g., `'lib'`, **push** to stack

```js
function normalizePathname(pathname) {
  let stack = [];

  pathname
    .split('/')
    .forEach(part => {
      if (part === '..') {
        stack.pop();
      } else if (part !== '.') {
        stack.push(part)
      }
    })

  return '/' + stack.join('/');
}
```
---
## Evaluate RPN expression

RPN expression `2,3,+,4,-,10,*` recursively defined as `(((2,3,+),4,-),10,*)`.

**Python:**

```py
def eval_rpn_tokens(tokens):

  ops = { '+': lambda x, y: x + y,
          '-': lambda x, y: x - y,
          '*': lambda x, y: x * y,
          '/': lambda x, y: x / y }

  # base cases
  if len(tokens) == 1: return float(tokens[0])
  if len(tokens) == 2: raise ValueError("input must be a valid RPN expression")

                                      #            -2 -1
  # recurse                           # [ 2, 3, + , 4, +]
  x = eval_rpn_tokens(tokens[:-2])    # [[2, 3, +]      ]
  y = float(tokens[-2])               # [           4   ]
  fn = ops[tokens[-1]]                # [              +]

  return fn(x, y)                     # ops[+](5, 4)
```

see [full implementation](.\eval_rpn.py)

---
## Evaluate mathmatical expression left to right implicit order of operation

Expressions:
`2+3-4*10` recursively defined as `(((2+3)-4)*10)`
But not always left to right b/c order of operations:
`6/2+1-4/2-1` recursively defined as `((((6/2)+1)-(4/2))-1)`

```js
var eval = function(str) {
  if (!isNaN(str)) return parseInt(str);

  const OPS = {
      "+": (a,b) => a+b,
      "-": (a,b) => a-b,
      "*": (a,b) => a*b,
      "/": (a,b) => Math.floor(a/b)
  };

  let tokens = tokenize(str); // by +- or */ if no +-'s
  while (tokens.length > 1) {
      let a = eval(tokens.pop()),
          f = OPS[tokens.pop()],
          b = eval(tokens.pop());
      tokens.push(f(a,b))
  }
  return parseInt(tokens[0]);
};
```

---
## Validate a bracketed expression for well-formedness

1. Process chars left to right:
2. _if opener, ie., `"["`, `"("`, or `"{"`, **push** to stack
3. _if closer, ie., `"]"`, `")"`, or `"}"`, **pop** stack. If stack empty or popped not a match, expression is *invalid*
4. If any open brackets left in stack, expression is *invalid*

**Python:**

```py
def validate_wellformedness(str):

  stack = []                  # open stack
  openers = {"[", "(", "{"}   # open set
  closers = {"]", ")", "}"}   # closed set
  match = {                   # open -> matching closed
    "[": "]",
    "(": ")",
    "{": "}"
  }

  for c in str:

    if c in openers:
      stack.append(c)

    elif c in closers:
      if not stack or match[stack.pop()] != c:
        return False

  return not stack
```
---
## Decode String Problem -  https://leetcode.com/problems/decode-string

wip js solution:

```js
function decode(str) {

  let tokens = tokenize(str);

	let alphaStack = [],
	    numStack = [],
      nextStrToRepeat = '';
      // lastNum = '';

  for (token in tokens) {

    if (isNumber(token)) { // 0-300
      numStack.push(lastNum);

    } else if (isAlpha(token)) { // alpha string: 1 <= s.length <= 30
      nextStrToRepeat = token;

    } else if (token === '[') {
      alphaStack.push(nextStrToRepeat);
      nextStrToRepeat = '',
      // lastNum = '';

    } else { // token === ']'
      nextStrToRepeat = alphaStack.pop() + nextStrToRepeat.repeat(numStack.pop());
    }
  }

	return nextStrToRepeat;
}
```

above based on py solution

```py
def decodeString(self, s: str) -> str:
  # instantiate stacks to store the number and the string to repeat.
  repeatStr = []
  numRepeat = []

  # initialize empty strings. One to store a multidigit number and other one to store the decoded string.
  tempNum = ''
  decodedStr = ''

  # start iterating throught the encoded string
  for char in s:
      # check if the char is a digit.
      if char.isdigit():
          tempNum += char # add the number to tempNum

      # check if the char is an opening bracket
      elif char == '[':
          repeatStr.append(decodedStr)
          numRepeat.append(tempNum)
          tempNum = ''
          decodedStr = ''

      # check when the bracket closes
      elif char == ']':
          decodedStr = repeatStr.pop() + (decodedStr * int(numRepeat.pop()))

      # else build the substring to repeat
      else:
          decodedStr += char

  return decodedStr
```

(solution from https://leetcode.com/problems/decode-string/discuss/714732/Python-solution-using-stacks.-O(n))

---
## Implement min/max stack API

tbd

---
## Validate that two keystroke sequences produce same output (ie. Backspace string compare)

my solution: use input string as stack.

maintain two pointers, i and write cursor, init both 0
iter thru, for each:
* if char: overwrite @ cursor and cursor++
* if #, cursor--

another very cool solution not using stack:

```py
def backspaceCompare(self, S, T):
  def F(S):
    skip = 0
    for x in reversed(S):
      if x == '#':
        skip += 1
      elif skip:
        skip -= 1
      else:
        yield x

  return all(x == y for x, y in itertools.izip_longest(F(S), F(T)))
```
(copied from https://leetcode.com/problems/backspace-string-compare/solution/)

---
## other problems:
