/*


source:
*/

// using run-length encoding

/**
 * @param {string} S
 * @param {string[]} words
 * @return {number}
 */
var expressiveWords = function(S, words) {

  let result = 0;

  // run-length encoding
  const rle = (word) => {
      let [i,g] = [1, 0];
      let chars = [word[0]];          // ['h','e','l','o']
      let counts = [1];               // [ 1 , 3 , 2 , 3 ]
      while (i < word.length) {
          if (word[i] === word[i-1]) {
              counts[g]++;
          } else {
              chars.push(word[i]);
              counts.push(1);
              g++;
          }
          i++;
      }
      return [chars,counts];
  }

  const isExpressive = (tChars, tCounts, chars, counts) => {
      if (chars.join('') != tChars.join('')) {
          return false
      }
      for (let i = 0; i < counts.length; i++) {
          let [cnt, tcnt] = [counts[i], tCounts[i]];
          if (cnt > tcnt) {
              return false;
          } else if (tcnt < 3 && tcnt != cnt) {
              return false;
          }
      }
      return true;
  }


  let [tChars, tCounts] = rle(S);
  for (let word of words) {
      if (isExpressive(tChars, tCounts, ...rle(word))) {
          result++;
      }
  }

  return result;
};

// concise solution using pointers, copied from https://leetcode.com/problems/expressive-words/discuss/785091/Javascript-simple-solution
var expressiveWords = function(S, words) {
  let res = 0;
  for(let w of words){
    if(isWord(S, w))res++
  }
  return res
};

function isWord(S,W){
  let j = 0;
  let N = S.length;
  for(let i = 0; i < N; i++){
    if(S[i] === W[j]) j++
    else if (S[i] === S[i-1] && S[i-1] === S[i-2]) continue
    else if (S[i] === S[i-1] && S[i] === S[i+1]) continue
    else return false
  }
  return j === W.length;
}
