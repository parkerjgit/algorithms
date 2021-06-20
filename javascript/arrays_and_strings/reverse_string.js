const reverseString = (str) => {
  let res = '';
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}

const reverseString2 = (str) => {
  if (str.length === 1) {
    return str;
  }

  return reverseString2(str.slice(1)) + str.slice(0, 1);
}

// using built-in methods
const reverseString3 = (str) => {
  return str.split('').reverse().join('');
}


// test tbd...
