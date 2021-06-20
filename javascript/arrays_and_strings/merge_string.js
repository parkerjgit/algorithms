
// optimized interative
const mergeStrings = (s1, s2) => {

  let [short, long] = (s1.length <= s2.length) ? [s1, s2] : [s2, s1]
  let res = [];
  let i = 0;

  while (i <= short.length - 1) {
    res.push(short[i], long[i]);
    i++;
  }

  // push rest of long
  // res.push(...long.slice(i));

  // convert to string and concat rest of long
  return res.join('') + long.slice(i);
}

// simple recursive
const mergeStrings2 = (s1, s2) => {

  const _merge = (a, b) => {
    if (a === '')
      return b;
    if (b === '')
      return a;

    return a[0] + b[0] + _merge(a.slice(1), b.slice(1));
  }

  return _merge(s1, s2);
}

// test
describe('mergeStrings', function() {
  it('correctly interleaves two strings', function() {
    expect(mergeStrings2('ace', 'bdfghi')).toEqual('abcdefghi');
    expect(mergeStrings2('aceghi', 'bdf')).toEqual('abcdefghi');
  })
})
