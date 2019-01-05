/*
Design and algorithm to find the min and max alements ina n array.

source: EPI 11.7
*/

const minMax = (arr, comp) => {

  // init min/max
  let [a, b] = arr.slice(0, 2);
  let [min, max] = comp(a, b) ? [a, b] : [b, a];

  // compare elemements 2-by-2
  for (let i = 2; i < arr.length; i += 2) {
    if (i === arr.length - 1) {
      break;
    }
    [a, b] = [arr[i], arr[i + 1]];
    let [localMin, localMax] = comp(a, b) ? [a, b] : [b, a];
    min = Math.min(localMin, min);
    max = Math.max(localMax, max);
  }

  // handle odd-length array
  if (arr.length % 2 !== 0) {
    let last = arr[arr.length - 1];
    min = Math.min(last, min);
    max = Math.max(last, max);
  }

  return {min, max}
}

// test tbd...
