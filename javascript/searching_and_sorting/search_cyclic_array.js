function searchCyclicArr(arr, target) {
  let [left, right] = [0, arr.length]; // left to exclusive right

  if (arr[left] > arr[right]) { // not cyclical
    return {min: left, max: right}
  } 
  
  return binSearchCyclicArr(arr, target, left, right);

}

function binSearchCyclicArr(arr, target, left, right) {

  let mid = left + Math.floor((right - left)/2);

  // mid is max: - - - mid/max | min - - -
  if (mid < arr.length -1 && arr[mid] > arr[mid + 1]) { 
    return {min: mid + 1, max: mid}
  }

  // mid is min: - - - max | mid/min - - -
  if (mid > 0 && arr[mid] < arr[mid - 1]) { 
    return {min: mid, max: mid - 1}
  }

  if (arr[mid + 1] > arr[right]) {
    binSearchCyclicArr(arr, target, mid + 1, right);
  } else {
    binSearchCyclicArr(arr, target, left, mid);
  }
}