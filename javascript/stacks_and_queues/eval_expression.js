/*
Given a string s which represents an expression, evaluate this expression and return its value.

Constraints:

The integer division should truncate toward zero.
1 <= s.length <= 3 * 105
s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
s represents a valid expression.
All the integers in the expression are non-negative integers in the range [0, 231 - 1].
The answer is guaranteed to fit in a 32-bit integer.

Solutions:

https://leetcode.com/problems/basic-calculator-ii/discuss/597084/Javascript-stack-O(N)
https://leetcode.com/problems/basic-calculator-ii/discuss/415009/JavaScript-Solution
https://leetcode.com/problems/basic-calculator-ii/discuss/135740/Clean-JavaScript-solution

source: Basic Calculator II (lc 227) - https://leetcode.com/problems/basic-calculator-ii/
*/

/**
 * @param {string} s
 * @return {number}
 *
 * requires: valid input
 *
 * time: O(n) - 2 passes to tokenize + 1 pass traverse stack
 * space: O(n) - stack of max size n
 */
 var eval = function(str) {
  if (!isNaN(str)) return parseInt(str);

  const OPS = {
      "+": (a,b) => a+b,
      "-": (a,b) => a-b,
      "*": (a,b) => a*b,
      "/": (a,b) => Math.floor(a/b)
  };

  let tokens = tokenize(str);
  while (tokens.length > 1) {
      let a = eval(tokens.pop()),
          f = OPS[tokens.pop()],
          b = eval(tokens.pop());
      tokens.push(f(a,b))
  }
  return parseInt(tokens[0]);
};

const tokenize = (str) => {
  str = str.replace(/ /g,'');
  if (str.includes('+') || str.includes('-')){
      return str.split(/(?=[+,-])|(?<=[+,-])/g).reverse()
  } else { // (str.includes('*') || str.includes('/'))
      return str.split(/(?=[*,/])|(?<=[*,/])/g).reverse()
  }
}
