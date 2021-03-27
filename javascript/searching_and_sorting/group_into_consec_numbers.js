/*
Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into sets of k consecutive numbers
Return True if it is possible. Otherwise, return False.

Variant:
Alice has a hand of cards, given as an array of integers.
Now she wants to rearrange the cards into groups so that each group is size W, and consists of W consecutive cards.
Return true if and only if she can.

source: Hand of Straights (lc 846) - https://leetcode.com/problems/hand-of-straights/
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var canGroupIntoConsec = function(nums, k) {
    
  if(nums.length % k) return false // hand must be divisible by k
  
  let counts = counter(nums);
  let roots = Object.keys(counts); // possible start values
  let rootId = 0;
  
  for (let i = 0; i < nums.length/k; i++) {       
      let root = parseInt(roots[rootId]); // get start of next group
      
      for(let j = root; j < root + k; j++){
          
          if(!counts[j])  // 0 or undefined
              return false
          
          if(counts[j] == 1) // last one
              rootId++
          
          counts[j]--;
      }
  }
  return true;
};

function counter(arr) {
  let res = [];
  for (let el of arr) {
      if (res[el]) {
          res[el] += 1;
      } else {
          res[el] = 1;
      }     
  }
  return res;
}