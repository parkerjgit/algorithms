/*
map elements to target Domain
*/


const mapToDomain = (arr, domain) => {

  let rangeSource = arr[arr.length - 1] - arr[0];
  let rangeTarget = domain[1] - domain[0];
  let offset = domain[0];

  return arr.map(el => (
    el * (rangeTarget / rangeSource) + offset
  ))
}

// test

console.log(
  mapToDomain([...Array(10).keys()],
  [10,90])
)
