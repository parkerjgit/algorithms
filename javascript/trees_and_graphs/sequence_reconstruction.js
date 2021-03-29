/*
Check whether the original sequence org can be uniquely reconstructed from the sequences in seqs. The org sequence is a permutation of the integers from 1 to n, with 1 ≤ n ≤ 104. Reconstruction means building a shortest common supersequence of the sequences in seqs (i.e., a shortest sequence so that all sequences in seqs are subsequences of it). Determine whether there is only one sequence that can be reconstructed from seqs and it is the org sequence.

Constraints:

1 <= n <= 10^4
org is a permutation of {1,2,...,n}.
1 <= segs[i].length <= 10^5
seqs[i][j] fits in a 32-bit signed integer.

source: Sequence Reconstruction (lc 444) - https://leetcode.com/problems/sequence-reconstruction/
*/

// https://leetcode.com/problems/sequence-reconstruction/submissions/
const sequenceReconstruction = function(superseq, seqs) {

  // set difference btw nodes in supersequence and nodes in subsequences must be zero
  let a = new Set(superseq);
  let b = new Set(seqs.reduce((arr,seq) => arr.concat(seq), []))
  if (a.size !== b.size || [...a].some(x => !b.has(x))) return false;

  const indegrees = superseq.reduce((arr,n) => { arr[n]=0; return arr; }, []); // []
  const adjList = superseq.reduce((arr,n) => { arr[n]=[]; return arr; }, []);

  // build graph
  for (let seq of seqs) {
    for (let i = 1; i < seq.length; i++) {
      let [from, to] = [ seq[i - 1], seq[i] ]
      adjList[from].push(to);
      indegrees[to] += 1;
    }
  }

  let i = 0; // index of superseq
  let q = Object.keys(indegrees).filter(n => indegrees[n] === 0);
  while (q.length) {

    let cur = parseInt(q.shift());

    // can only have 1 node at time with zero indegree
    if (q.length > 0) return false;

    // that node must be match ith node in superseq
    if (cur !== superseq[i]) return false;

    // decrement indegrees for adjacencies and push any that now have zero indegrees to queue
    for (let node of adjList[cur]) {
      indegrees[node]--;
      if (indegrees[node] === 0) {
        q.push(node)
      }
    }
    i++;
  }

  return i === superseq.length
}


// first attempt. doesn't check for uniqueness as is

/**
 * @param {number[]} org
 * @param {number[][]} seqs
 * @return {boolean}
 */
var sequenceReconstruction = function(org, seqs) {
  let map = new Map();

  for (let sub of seqs) { // O(m)
      let [key, val] = [sub[0], sub];
      if (!map.has(key)) {
          map.set(key,[])
      }
      map.get(key).push(val);
  }

  for (let i = 0; i < org.length; i++) { // O(logn)
      let dig = org[i];

      if (!map.has(dig)) return false;

      let bucketCopy = [...map.get(dig)];
      map.delete(dig);

      // update map
      for (let [first, ...rest] of bucketCopy) {
          if (!rest.length) continue;
          let [key, val] = [rest[0], rest];
          if (!map.has(key)) {
              map.set(key,[])
          }
          map.get(key).push(val);
      }
  }
  return (map.size == 0)
};
