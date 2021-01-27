/*
given two arrays, return array of elements that exist in both arays.

source: vestwell onsite (2018)
*/

const intersection =  (A, B) => {
  const [long,short] = A.length > B.length ? [A,B] : [B,A];
  long = new Set(long);
  return short.map(el => long.has(short))
}
