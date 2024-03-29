/*
Suppose you are at a party with n people (labeled from 0 to n - 1), and among them, there may exist one celebrity. The definition of a celebrity is that all the other n - 1 people know him/her, but he/she does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: "Hi, A. Do you know B?" to get information about whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function bool knows(a, b) which tells you whether A knows B. Implement a function int findCelebrity(n). There will be exactly one celebrity if he/she is in the party. Return the celebrity's label if there is a celebrity in the party. If there is no celebrity, return -1.

source: Find the Celebrity (lc 277) - https://leetcode.com/problems/find-the-celebrity
*/

// cool linear time, constant space solution based on https://leetcode.com/problems/find-the-celebrity/solution/
function findCelebrity(n) {
  let candidate = 0;

  // can rule out somebody at each step b/c
  // if current candidate knows person i, candidate is not a celeb
  // if current candidate does not know person i, person i is not celeb
  for (let i = 0; i < n; i++) {
      if (candidate == i) continue;
      if (knows(candidate, i)) {
          candidate = i;
      }
  }

  // still have to make sure single remaining candidate is celeb.
  for (let i = 0; i < n; i++) {
      if (candidate == i) continue;
      if (knows(candidate, i) || !knows(i, candidate)) {
          return -1;
      }
  }

  return candidate;
};
