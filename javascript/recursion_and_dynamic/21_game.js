/**
 * @param {number} N
 * @param {number} K
 * @param {number} W
 * @return {number}
 */
var new21Game = function(N, K, W) {
  // dp table prop[cur] is probability of having a final sum between K and N, given current sum.
  // can have a current sum upto K+W because you will draw one more card if current sum is K,
  // that card is at most W, which results in a current sum of K+W.
  let prop = new Array(K+W).fill(0);

  // if current sum is between K and N, probability is 1.0
  for (let i = K; i < N+1; i++) {
      prop[i] = 1.0;
  }

  // There is probability of 1/W of drawing each card from 1 to W, so
  // P[K]   = 1.0
  // P[K-1] = 1/W
  // P[K-2] = (1/W + P[K-1]) / W
  //  :
  // P[i] = (prop[i+1] + ... + prob[i+W]) / W
  let sum = Math.min(N-K+1, W);
  for (let i = K-1; i >= 0; i--) {
      prop[i] = sum/W;
      sum += prop[i] - prop[i+W]
  }

  return prop[0];
};

// triple step dp

// For each probablity X = i, it is the relation:
// P( X = i ) = P( X = i - 1) + P ( X = i - 2 ) + .... P ( X = i - W ), where i > W
// For example,
// P( X = 0 ) = 1                           # Initial state, no need to draw cards
// P( X = 1 ) = 1/W                         # Only 1 out of W chance in getting X = 1
// P( X = 2 ) = 1/W + 1/W^2                 # We can draw a 2 or two 1s.
// P( X = 3 ) = 1/W + 1/W^2 + 1/W^2 + 1/W^3 # We can draw a 3, a (2,1), a (1,2), and two 1s.
// P (X = 4 ) = ( P( X = 3 ) + P( X = 2 ) ) / W
// .etc
// see also: https://leetcode.com/problems/new-21-game/discuss/714448/PythonC%2B%2B-Posterior-probability-%2B-climbing-stairs

var new21Game = function(N, K, W) {

  if (K == 0 ) return 1.0;    // done before you start!
  if (N >= K + W) return 1.0; // for large N, win is guaranteed

  let prob = []; // not nec to prefill, ie Array(N).fill(0);
  prob[0] = 1.0;

  // calculate probabilities using sliding window
  let windowProbSum = 1.0;
  for (let i = 1; i < N+1; i++) {

      // prob[i] = (prob[n-1] + prob[n-2] + ...) / W
      prob[i] = windowProbSum / W;

      // update window
      if (i < K) windowProbSum += prob[i];
      if (i >= W) windowProbSum -= prob[i-W];

  }

  // sum probabilities between K and N
  let result = 0;
  for (let i = K; i <= N; i++) {
      result += prob[i];
  }
  return result
}
