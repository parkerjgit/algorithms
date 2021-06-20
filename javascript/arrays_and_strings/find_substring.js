/*
find index of first occurance of substring
*/

// simplest
const indexOf = (str, sub) => {
  let [m, n] = [sub.length, str.length];
  for (let i = 0; i <= n - m; i++) {
    if (str.slice(i, i + m) === sub) {
      return i;
    }
  }
  return -1;
}

// optimized for time/space
const indexOf2 = (str, sub) => {

  // is substring at index i
  const _subFound = (i) => {
    for (let j = 0; j <= sub.length - 1; j++) {
      if (str[i + j] !== sub[j]) return false;
    }
    return true;
  };

  let i = 0;
  while (i <= str.length - sub.length) {
    if (_subFound(i)) return i
    i++;
  }

  return -1;
}

describe('findSubstring', function() {
  it('finds first occurance of substring and return index', function() {
    expect(indexOf('thisisafantasticstring', 'fantastic')).toEqual(7);
    expect(indexOf('thisisafantasticstring', 'bantastic')).toEqual(-1);
  })
})
