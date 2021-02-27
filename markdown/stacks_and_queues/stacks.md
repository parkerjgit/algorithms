# Stacks

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

## Implement stack

```js
// arrays already implement stack api
let myStack = [];

// if we want to expose an api and decouple implementation
function Stack() {
  _data: [],
  push(val) { return this._data.push(val) },
  pop() { return this._data.pop() }
}

// if we don't want to store methods on each object, e.g. if we need lots of stack instances
tbd...
```

## Normalize pathnames

1. Process parts of pathname left-to-right: 
  a. if `'..'`, **pop** stack
  b. if `'.'`, ignore
  c. else its a directory/file name, e.g., `'lib'`, **push** to stack

**Javascript:**

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

## Validate a bracketed expression for well-formedness

1. Process chars left to right:
    a. if opener, ie., `"["`, `"("`, or `"{"`, **push** to stack
    b. if closer, ie., `"]"`, `")"`, or `"}"`, **pop** stack. If stack empty or popped not a match, expression is *invalid*
2. If any open brackets left in stack, expression is *invalid*

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

## Implement min/max stack API

## other problems:

