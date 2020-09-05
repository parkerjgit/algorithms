


// 1. prefill an array w/ zeros
let a = Array(10).fill(0);
console.log(a)

// 1. prefill an array w/ range from 5 - 15
let b = [...Array(15).keys()].slice(5)
console.log(b)

// prefill array with letters of alphabet
let c = [...Array(36).keys()].splice(10).map(i=>i.toString(36));
let d = [...Array(26).keys()].map(_=>(++i).toString(36),i=9);

// ************************************************************

// 2. prefill a matrix
let c = [...Array(10)].map( _ => (
  Array(10).fill(0)
))
console.log(c)

// ************************************************************

// 3. prefill a matrix with distinct objects
let d = [...Array(10)].map( _ => (
  [...Array(10)].map( _ => (
    {}
  ))
))
console.log(d)

// ************************************************************

console.log(`
4. map elements to target Domain:
`)

const mapToDomain = (src, domain) => {
  let rangeSource = src[src.length-1] - src[0];
  let rangeTarget = domain[1] - domain[0];
  let offset = domain[0];
  return src.map(el => (
    el * (rangeTarget / rangeSource) + offset
  ))  
}

console.log(
  mapToDomain([...Array(10).keys()], 
  [10,90])
)

// ************************************************************

console.log(`
4. compute sum/factorial of numbers up to 100, recursively using reduce:
`)

const sum = n => [...Array(n+1).keys()]
  .reduce((a,b)=>a+b,0);
const fac = n => [...Array(n+1).keys()]
  .slice(2)
  .reduce((a,b)=>a*b,1)

console.log(sum(100));
console.log( (100*(100+1))/2 );
console.log(fac(5));

// ************************************************************

console.log(`
4. simultaneously process every element in two arrays of equal/unequal size
`)

// parallel process every element two arrays in-place
const parallelProcess = (A, B, fn) => {
    let n = A.length;
    [...Array(n).keys()].forEach( i => {
        A[i] = fn(A[i]);
        B[i] = fn(B[i]);
    })
}

// ************************************************************

// parallel process every element in n arrays in-place
const parallelProcess = (fn, ...arrs) => {
    let n = arrs[0].length;
    [...Array(n).keys()].forEach( i => {
        arrs.forEach( arr => {
            arr[i] = fn(arr[i])
        })
    })
}

// ************************************************************

// implement range function

function* range(start, stop, step) {
    for (let i = start; i < stop; i += step) {
        yield i; 
    }
}

let r = range(1,10,3);
console.log(r.next().value);
console.log(r.next().value);
console.log(r.next().value);
console.log(r.next().value);

// ************************************************************

console.log(`
4. process every third element of an array of size n
`)

function everyThird(arr, fn) {
  [...range(0,arr.length,3)].forEach(i => fn(arr[i]))
}

everyThird([1,2,3,4,5,6,7,8,9,10], (el) => console.log(el))

// ************************************************************

console.log(`
4. process every third element of an array of size n lazily
`)

function everyThirdLazy(arr, fn) {
  let gen = range(0,arr.length,3);
  let i = gen.next().value;
  while (typeof i !== 'undefined') {
    fn(arr[i]);
    i = gen.next().value;
  }
}

everyThirdLazy([1,2,3,4,5,6,7,8,9,10], (el) => console.log(el))

// ************************************************************

console.log(`
 apply/restore a permutation of arr
`)

function applyPerm(arr, perm) {
  let res = [];
  arr.forEach((_,i) => {
    res[i] = arr[perm[i]];
  });
  return res;
}

function restorePerm(arr, perm) {
  let res = []
  arr.forEach((_,i) => {
    res[perm[i]] = arr[i]
  })
  return res;
}