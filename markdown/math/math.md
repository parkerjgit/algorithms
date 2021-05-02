## Notes
## multiple string representation of two integers

```js
var multiply = function(a, b) {
  if (a === '0' || b === '0') return '0';

  // length of product will be the sum of lengths of factors (or that sum - 1)
  let res = Array(a.length + b.length).fill(0);

  for (let i = a.length - 1; i >= 0 ; i--) {
      for (let j = b.length - 1; j >= 0; j--) {

          // calc partial product
          let carry = res[i+j+1];
          let partial = a[i] * b[j] + carry;

          // update result
          res[i+j+1] = partial % 10;
          res[i+j] += Math.floor(partial/10); // next carry
      }
  }

  return (res[0] === 0)
      ? res.slice(1).join('') // leading zero
      : res.join('')
};
```
see [full implementation](./../../javascript/arrays_and_strings/multiply_string_representations.js)

---
## Enumerate primes upto n.

---
