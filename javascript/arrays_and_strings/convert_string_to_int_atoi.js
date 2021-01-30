/*
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit charcter or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result.
Note:

Only the space character ' ' is considered a whitespace character.
Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.

source: String to Integer (atoi) (leetcode) - https://leetcode.com/problems/string-to-integer-atoi/
*/

// helpers
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

// constants
const MAX_VALUE = '2147483647'; // 2**31
const MIN_VALUE = '2147483648'; // 2**31 - 1

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {

    const extractFirstWord = ([_, v]) =>
      [null, v.trimLeft().split(" ")[0]];

    const extractSign = ([_, v]) => [
        (v[0] == "-") ? -1 : 1,
        (v[0] == "-" || (v[0] == "+") ? v.slice(1) : v.slice(0))
      ];

    const extractNumericPrefrix = ([s, v]) => {
      let left = v.split('').findIndex(c => c !== '0'),
          right = v.split('').findIndex(c => isNaN(c));

      if (left == -1) { // empty string or all zeros
        return [1, "0"]
      } else if (right == -1) { // all numeric
        return [s, v.slice(left)]
      } else {
        return [s, v.slice(left, right)];
      }
    };

    const clamp = ([s, v]) => (s < 0)
      ? [s, Math.min(v, MIN_VALUE)]
      : [s, Math.min(v, MAX_VALUE)]

    const [sign, value] = pipe(
      extractFirstWord,
      extractSign,
      extractNumericPrefrix,
      clamp
    )([null, s]);

    return sign * value; // coerses to number
};

// test

describe('myAtoi', () => {
  it('correctly converts string to int', () => {
    expect(myAtoi("42")).toEqual(42);
    expect(myAtoi("   -42")).toEqual(-42);
    expect(myAtoi("4193 with words")).toEqual(4193);
    expect(myAtoi("words and 987")).toEqual(0);
    expect(myAtoi("-91283472332")).toEqual(-2147483648);
  })
})

