// Counting and Combinatorics

// implement a range function that returns an array
const range = (start, stop, step) => {
    let result = []
    for (let i = start; i < stop; i += step) {
        result += i; 
    }
    return range
}

// implement a range generator function
function* range(start, stop, step) {
    for (let i = start; i < stop; i += step) {
        yield i 
    }
}

// implement cartesian product function for 2 sets
const cartesianProduct = (set1, set2, fn) => {
    let result = [];
    set1.forEach(a => {
        set2.forEach(b => {
            result.push(fn(a, b))
        })
    })
    return result;
}

// implement cartesian product function for n sets
const nAryCartesianProduct = (...sets) => (
    sets.reduce((combinedSet, nextSet) => {
        cartesianProduct(combinedSet, nextSet, (a, b) => [].concat(a,b))
    })
)

// calc. all subsets from 1 sets (powerset)


// calc all permutations
const permutations = (arr) => {

    const _permutations = (arr) => {

      if (arr.length === 0)
        return []
      if (arr.length === 1)
        return [arr]

      let result = []
      arr.forEach((el, i) => {

        let exclude = [
            ...arr.slice(0,i),
            ...arr.slice(i+1)
        ];

        let excludePerms = _permutations(exclude);
        
        let includePerms = excludePerms.map(perm => (
            [el, ...perm]
        ));

        result.push(...includePerms);  
      })

      return result
    }

    return _permutations(arr);
}

//
const powerset = ([first, ...rest]) => {
    if(!first) {
      return [[]]
    }
  
    let exclude = powerset(rest);
    let include = exclude.map(s => [...s, first]);
  
    return [
      ...exclude,
      ...include
    ]
  }
  
  const powerset2 = (arr) => {
    let result = [];
  
    let decoded = (mask, arr) => {
      let result = []
      let i = arr.length -1;
      while (mask > 0) {
        if (mask & 1) {
          result.push(arr[i])
        }
        mask >>= 1;
        i--;
      }
      return result;
    }
  
    let subset = (1 << arr.length) - 1;
    while (subset > 0) {
      result.push(decoded(subset, arr))
      subset--;
    } 
    return result;
  }
  
  console.log(powerset([1,2,3]))