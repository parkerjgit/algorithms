function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)
  let ops = S.split(' ');
  let stack = [];

  const isPosInt = (s) => Number.isInteger(Number(s)) && Number(s) >= 0;

  ops.forEach(op => {
    if (isPosInt(op)) {
      stack.push(op);
    } else if (op === 'DUP') {
      stack.push(stack[stack.length-1])
    } else if (op === 'POP') {
      stack.pop();
    } else if (op === '+') {
      let a = stack.pop();
      let b = stack.pop();
      stack.push(a + b);
    } else if (op === '-') {
      let c = stack.pop();
      let d = stack.pop();
      stack.push(c - d);
    } else {
      return -1;
    }
  });
}
