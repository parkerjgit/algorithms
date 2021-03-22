/*
In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move consists of either replacing one occurrence of "XL" with "LX", or replacing one occurrence of "RX" with "XR". Given the starting string start and the ending string end, return True if and only if there exists a sequence of moves to transform one string to the other.

source: Swap Adjacent in LR String (lc 777) - https://leetcode.com/problems/swap-adjacent-in-lr-string/
*/

/**
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
function canTransform(start, end) {

  // L's and R's must be in same relative position.
  const invariant1 = (start, end) => {
    // return start.replace(/X/g, '') === end.replace(/X/g, '');
    return start.replaceAll('X','') !== end.replaceAll('X','');
  }

  // each "L" can only have moved left
  const invariant2 = (start, end) => {
    let [i,j] = [0,0];
    while (i < start.length) {
        if (start[i] === 'L') {
            while (end[j] !== 'L') j++;
            if (j > i) {
                return false;
            }
            j++;
        }
        i++;
    }
    return true;
  }

  // each "R" can only have moved right
  const invariant3 = (start, end) => {
    let [i,j] = [start.length - 1, start.length - 1];
    while (i >= 0) {
        if (start[i] === 'R') {
            while (end[j] !== 'R') j--;
            if (j < i) {
                return false;
            }
            j--;
        }
        i--;
    }
    return true;
  }

  return [invariant1, invariant2, invariant3].every(f=>f(start, end))
}
