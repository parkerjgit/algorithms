/*
question:
There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a
character. Given two strings, write a function to check if they are one edit (or zero edits) away.

e.g.
pale,   ple     -> true
pales,  pale    -> true
pale,   bale    -> true
pale,   bae     -> false

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 199.
*/


/*
Solution:
Index the first and last element of each char array as i,j and m,n respectively. While indexed elements are the
same from left to right, increment the ids i,m. While elements are same from right to left, decrement the
ids j,n. Then, for either array, if end index is larger than start index, the strings must be different by more
than one character.

e.g.
        i ->     <- j
 bef: | p | a | l | e |
 aft: | p | l | e |
        m -> <- n

Time:  O(n)
Space: O(1)
*/
const oneAway = (s1, s2) => {

  let [i, j] = [0, s1.length - 1];
  let [m, n] = [0, s2.length - 1];

  while (s1[i] === s2[m]) {
    i++;
    m++;
  }
  while (s1[j] === s2[n]) {
    j--;
    n--;
  }

  return (i >= j && m >= n);
}

// test

describe('oneAway', function() {
  it('returns true if one subtraction/insertion away', function() {
    expect(oneAway('pale', 'ple')).toEqual(true)
  });
  it('returns true if one substition away', function() {
    expect(oneAway('pale','bale')).toEqual(true)
  })
  it('returns false otherwise', function() {
    expect(oneAway('pale','bae')).toEqual(false)
  })
})
