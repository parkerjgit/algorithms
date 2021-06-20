/*
question:
Given two strings, write a function to check if strings are anagrams of each other. Anagrams are a strings that contains
the same characters in different order.
*/

function isAnagram(s1, s2) {

  // not anagrams if not same length
  if (s1.length !== s2.length) return false

  // count letters in s1
  var counts = {}
  Array.prototype.forEach.call(s1, c => {
    if (c in counts) {
      counts[c] += 1;
    } else {
      counts[c] = 1
    }
  })

  // check s2
  Array.prototype.forEach.call(s2, c => {
    if (c in counts && counts[c] > 0) {
      counts[c] -= 1;
    } else {
      return false;
    }
  })

  // anagram if all counts at 0
  return !Object.keys(counts).map(c => counts[c]).some(x=>x>0)
}

// test

describe('is anagram', function() {
  it('returns true for two empty strings', function() {
    expect(isAnagram('','')).toEqual(true)
  })
  it('returns true if stings are anagrams of each other, false otherwise', function() {
    expect(isAnagram('a', 'a')).toEqual(true)
    expect(isAnagram('ab', 'ba')).toEqual(true)
    expect(isAnagram('ba', 'ba')).toEqual(true)
    expect(isAnagram('abcde', 'ecdab')).toEqual(true)
    expect(isAnagram('', 'b')).toEqual(false)
    expect(isAnagram('a', '')).toEqual(false)
    expect(isAnagram('a', 'b')).toEqual(false)
    expect(isAnagram('ab', 'b')).toEqual(false)
    expect(isAnagram('a', 'ba')).toEqual(false)
    expect(isAnagram('abcde', 'ecdaf')).toEqual(false)
  })
})
