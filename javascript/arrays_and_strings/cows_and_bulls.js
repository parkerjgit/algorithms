/*
You are playing the Bulls and Cows game with your friend. You write down a secret number and ask your
friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

The number of "bulls", which are digits in the guess that are in the correct position.
The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.
Given the secret number secret and your friend's guess guess, return the hint for your friend's guess.

The hint should be formatted as "xAyB", where x is the number of bulls and y is the number of cows. Note that both secret and guess may contain duplicate digits.

Constraints:

1 <= secret.length, guess.length <= 1000
secret.length == guess.length
secret and guess consist of digits only.

source: https://leetcode.com/problems/bulls-and-cows/
*/

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
  let [bulls, cows] = [0,0];
  let counts = counter(secret);

  // process secret and guess in parallel
  for (let i = 0; i < secret.length; i++) {
      let [s, g] = [secret[i], guess[i]];

      if (s === g && counts[s] > 0) {
          bulls++; counts[s]--;
      } else if (s === g && counts[s] < 1) {
          bulls++; cows--;
      } else if (s != g && counts[g] > 0) {
          cows++; counts[g]--;
      }

      // else, do nothing.
  }
  return `${bulls}A${cows}B`
};


const counter = (str) => {
  let result = Array(10).fill(0);
  for (let char of str) {
      result[parseInt(char)]++;
  }
  return result;
}
