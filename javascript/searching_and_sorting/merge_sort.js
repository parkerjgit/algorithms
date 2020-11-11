

// function mergeSort (arr) {
//   if (arr.length === 1) {
//     return arr
//   }

//   const mid = Math.floor(arr.length / 2)
//   const left = arr.slice(0, mid)
//   const right = arr.slice(mid)

//   return merge(
//     mergeSort(left),
//     mergeSort(right)
//   )
// }

// function merge (left, right) {
//   let res = []

//   let i = 0, j = 0;
//   while (i < left.length && j < right.length) {
//     if (left[i] < right[j]) {
//       res.push(left[i]);
//       i++;
//     } else {
//       res.push(right[j]);
//       j++;
//     }
//   }

//   return res.concat(left.slice(i)).concat(right.slice(j))
// }

// in-place solution

function merge(arr, left, mid, right) {

  // temp arrays for now
  let A = arr.slice(left, mid + 1);
  let B = arr.slice(mid + 1, right + 1);

  let lenA = mid - left + 1;
  let lenB = right - mid;

  let i = 0; //left;
  let j = 0; //mid + 1;
  let k = 0;

  // merge arrays
  while (i < lenA && j < lenB) {
    if (A[i] < B[j]) {
        arr[k] = A[i];
        i++;
    } else {
        arr[k] = B[j]
        j++;
    }
    k++;
  }

  // add rest
  while (i < lenA) {
    arr[k] = A[i];
    i++;
  }
  while (j < lenB) {
    arr[k] = B[j]
    j++;
  }
}

// in-place solution

var mergeSort = function(arr) {

  function _sort(arr, left, right) {

      //console.log(`left: ${left}, right: ${right}`);
      if (left < right) {
        console.log(`left: ${left}, right: ${right}`);
        let mid = left + Math.floor((right - left) / 2); // this should be l + (r - l)//2
        _sort(arr, left, mid);
        _sort(arr, mid + 1, right)
        merge(arr, left, mid, right);
        console.log(arr);
      }
  }

return _sort(arr, 0, arr.length - 1);
}
