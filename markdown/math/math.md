## Notes

**warm-up**

1. [Factorialize a number](https://medium.freecodecamp.org/how-to-factorialize-a-number-in-javascript-9263c89a4b38)
2. Find GCF
3. Find LCM
4. Factor a number
4. Enumerate primes upto n
5. Is power of
6. Xth greatest
6. Two/Three sum to provided value.
5. Compute Factorial iterative/recursive
6. Compute Fibonaci iterative/recursive
7. generate range of numbers/characters
1. Most Common Letter.
2. Number of repeating letters.
3. Compute powerset
4. compute permutations of size n
5. compute permutations of all subsets
4. choose 1 combinations, eg., pairs, thriples, etc.

**problems**

1. convert number to roman numeral.
2. more problems: [project euler](https://projecteuler.net/archives)

## multiple string representation of two integers

![]()

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
see [write-up](./../../markdown/math/multiply_string_representations.js)

---
## Enumerate primes upto n.

---
