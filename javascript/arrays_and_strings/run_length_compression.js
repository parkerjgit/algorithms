/*
Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be returned separately, but instead be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

Constraints:

1 <= chars.length <= 2000
chars[i] is a lower-case English letter, upper-case English letter, digit, or symbol.

source: String Compression (lc 443) - https://leetcode.com/problems/string-compression/
*/

/**
 * @param {character[]} chars
 * @return {number}
 *
 * Time: O(n) - single pass
 * Space: O(1) - in-place
 */
var runLengthCompress = function(chars) {
  let write = 0, // write index
      run = 1,
      n = chars.length;

  for (let i = 0; i < n; i++) { // read index

      if (i === n - 1 || chars[i+1] !== chars[i]) { // end run

          // 1. write char
          chars[write++] = chars[i];

          // 2. write count if run length > 1
          if (run > 1) {
              for (let digit of run.toString()) {
                  chars[write++] = digit;
              }
              run = 1;
          }

      } else { // continue run
          run++;
      }
  }

  return write;
};
