/*
return the range, the average and the median of products of the "integer partitions".

Given a number n, we can calculate the "integer partitions", eg.

enum(4) -> [[4],[3,1],[2,2],[2,1,1],[1,1,1,1]] and
enum(5) -> [[5],[4,1],[3,2],[3,1,1],[2,2,1],[2,1,1,1],[1,1,1,1,1]].
enum(n) -> [[n],[n-1,1],[n-2,2],...,[1,1,...,1]]
(order of array and sub-arrays doesn't matter)

For each sub-array of enum(n) we can calculate its products, removing duplicates and sorting, eg.:

prod(5) -> [1,2,3,4,5,6]
prod(8) -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18]

But, The number of parts in a partition grows very fast. For n = 50 number of parts is 204226, for 80 it is 15,796,476 It would be too long to tests answers with arrays of such size. If n = 40 prod(n) has a length of 2699 hence the tests will not verify such arrays, so instead return the range, the average and the median of prod(n) in the following form:

stats(5) -> "Range: 5 Average: 3.50 Median: 3.50"

source: https://www.codewars.com/kata/getting-along-with-integer-partitions/train/javascript
*/



const partitions = (n) => {
  var res = [[n]];
  for (let i = 1; i <= n-1; i++) {
      res = res.concat(partitions(n-i).map(p=>p.concat(i)))
  }
  return res
}

const products = (arrs) => {
  return arrs.map(arr => arr.reduce((a,b) => a*b, 1))
}

const uniq = arr => [...new Set(arr)];

const range = (arrs) => {
  return Math.max(...arrs) - Math.min(...arrs);
}

const avg = (arrs) => {
  return arrs.reduce((a,b)=>(a+b),0)/arrs.length;
}

const median = (arrs) => {
    arrs.sort((a,b)=>a-b)
    if (arrs.length % 2 === 0) {
        let i = arrs.length/2;
        return arrs.slice(i-1,i+1).reduce((a,b)=>a+b)/2
    }
        return arrs[Math.floor(arrs.length/2)]
}

const info = (n) => {
  let prods = uniq(products(partitions(n)));
  return `Range: ${range(prods)} Average: ${avg(prods).toFixed(2)} Median: ${median(prods).toFixed(2)}`
}

// optimized

var memo = {}
const products2 = (n) => {
  let seen = new Set([n]);
  for (let i = 1; i <= n-1; i++) {
      if ( !(memo[n-i]) ) {
        memo[n-i] = products2(n-i);
      }
      memo[n-i].forEach(prod => {
        seen.add(prod*i)
      })
  }
  return [...seen]
}

const info2 = (n) => {
  let prods = products2(n);
  return `Range: ${range(prods)} Average: ${avg(prods).toFixed(2)} Median: ${median(prods).toFixed(2)}`
}

// test

describe('info', function() {
  it('return the range, the average and the median of products of the integer partitions', function() {
    expect(info2(5)).toEqual("Range: 5 Average: 3.50 Median: 3.50");
    expect(info2(8)).toEqual("Range: 17 Average: 8.29 Median: 7.50");
  })
})
