const powerset = ([first, ...rest]) => {
    if(!first)
      return [[]]
  
    let exclude = powerset(rest);
    let include = exclude.map(s => [...s, first]);
  
    return [
      ...exclude,
      ...include
    ]
  }

  // return elements corresponding to 1's in bit mask
  const bitFilter = (mask, arr) => {
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
  
  const powerset2 = (arr) => {
    let result = [];
    let subset = (1 << arr.length) - 1;
    while (subset > 0) {
      result.push(bitFilter(subset, arr))
      subset--;
    } 
    return result;
  }