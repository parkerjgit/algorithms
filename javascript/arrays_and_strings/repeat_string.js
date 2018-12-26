const repeatString = (str, n) => {
  const _repeat = (str, n) => {
    if (n === 1) return Str;
    if (n <= 0) return '';

    return str + _repeat(str, n-1);
  }
  return _repeat(str, n)
}


const repeatstring = (str, n) => {
  let res = '';
  [...Array(n)].forEach(_ => {
    res += str;
  });
  return res;
}
