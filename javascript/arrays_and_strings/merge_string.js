const mergeStrings = (s1, s2) => {

  let [short, long] = (s1.length <= s2.length) ? [s1, s2] : [s2, s1]
  let res = [];
  let i = 0;

  while (i <= short.length - 1) {
    res.push(short[i], long[i]);
    i++;
  }

  // push rest of long
  res.push(...long.slice(i));

  // convert to  string and return
  return res.join('');
}

// test
describe('mergeStrings', function() {
  it('correctly interleaves two strings', function() {
    expect(mergeStrings('ace', 'bdfghi')).toEqual('abcdefghi');
  })
})
