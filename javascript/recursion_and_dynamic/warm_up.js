// recursion warm-up questions

// *************************************************************************
// 1. compute factorial of n
//
// Solve with top-down and bottom-up recursion
// recall factorial(5) = 5 x 4 x 3 x 2 x 1 = 5 x factorial(4)
// and factorial of n can be defined recursively as n x factorial(n-1)
// *************************************************************************

// Top-down: fac(n) = n * fact(n-1)
// Time: O(n!)
// Space: O(n)
// const topDownFactorial = (n) => {
//     if (n === 0) return 1
//     if (n <= 2) return n;
//     return n * topDownFactorial(n-1);
// }

// Top-down with Memoization
// Time: O(n)
// Space: O(n)
const topDownFactorial = (n) => {
    let memo = [1,1,2];
    if (!memo[n])
        memo[n] = n * topDownFactorial(n-1)
    return memo[n];
}

// NOTE: prefer array over object for map if keys are 0,1,2,...

// Using memozation decorator

// Bottom-up: fac(n): (((fac(0) * 1) * 2) * 3)
// Time: O(n)
// Space: O(1)
const bottomUpFactorial = (n) => {
    return [...Array(n+1).keys()].slice(1)
        .reduce((tab, i) => {
            return tab * i;
        }, 1)
}

// efficient one-liners
const BUF = (n) => range(1, n).reduce((tab, i) => tab * i, 1)    // where range yeilds [1,2,3,...n]

describe('top down factorial', function() {
    it('calculates the factorial of number correctly', function() {
        expect(topDownFactorial(0)).toEqual(1)
        expect(topDownFactorial(1)).toEqual(1)
        expect(topDownFactorial(2)).toEqual(2)
        expect(topDownFactorial(3)).toEqual(6)
        expect(topDownFactorial(5)).toEqual(120)
    })
})
describe('bottom up factorial', function() {
    it('calculates the factorial of number correctly', function() {
        expect(bottomUpFactorial(0)).toEqual(1)
        expect(bottomUpFactorial(1)).toEqual(1)
        expect(bottomUpFactorial(2)).toEqual(2)
        expect(bottomUpFactorial(3)).toEqual(6)
        expect(bottomUpFactorial(5)).toEqual(120)
    })
})

// *************************************************************************
// 1. compute fibonacci of n
//
// Solve with top-down and bottom-up recursion
// recall factorial(5) = 5 x 4 x 3 x 2 x 1 = 5 x factorial(4)
// and factorial of n can be defined recursively as n x factorial(n-1)
// *************************************************************************

// bottom-up with reused cache
// Time: O(n)
// Space: O(1)

const fib = (n) => {
    return [...Array(n).keys()].slice(1)
      .reduce(([minus2, minus1], next) => [
          minus1,
          minus2 + minus1,
      ], [0,1])[1]
  }

  // flatten arbitrarly nested array

  const flatten = array => array.reduce((a, b) => {
    return (Array.isArray(b))
      ? a.concat(flatten(b))
      : a.concat(b)
  }, [])

  const arr = [[1,[2,[3]]],4,[5,[6,[7]]]]
  const flattenedArray = flatten(arr)
