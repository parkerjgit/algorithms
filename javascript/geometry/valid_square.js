/*
Given the coordinates of four points in 2D space p1, p2, p3 and p4, return true if the four points construct a square.
The coordinate of a point pi is represented as [xi, yi]. The input is not given in any order.
A valid square has four equal sides with positive length and four equal angles (90-degree angles).

source: Valid square (lc 519) - https://leetcode.com/problems/valid-square/
*/

// first attempt

/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
function validSquare (p1, p2, p3, p4) {
  return [
    _validSquare(p1, p2, p3, p4),
    _validSquare(p1, p3, p2, p4),
    _validSquare(p1, p4, p2, p3)
  ].some(x=>x)
}

function _validSquare ([x1, y1], [x2, y2], [x3, y3], [x4, y4]) { // 1 is opposite 2, and 3 is opposite 4
  let [c1x, c1y] = [x1 + (x2 - x1)/2, y1 + (y2 - y1)/2],
      [c2x, c2y] = [x3 + (x4 - x3)/2, y3 + (y4 - y3)/2],
      d1 = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2),
      d2 = Math.sqrt((x4 - x3)**2 + (y4 - y3)**2),
      s1 = Math.sqrt((x1 - x3)**2 + (y1 - y3)**2),
      s2 = Math.sqrt((x3 - x2)**2 + (y3 - y2)**2),
      s3 = Math.sqrt((x2 - x4)**2 + (y2 - y4)**2),
      s4 = Math.sqrt((x4 - x1)**2 + (y4 - y1)**2);

  return [
    c1x === c2x,
    c1y === c2y,
    d1 > 0,
    d1 === d2,
    s1 === s2,
    s2 === s4,
    s2 === s3
  ].every(x=>x)
}

// better solution

var validSquare = function(p1, p2, p3, p4) {

    const distances = [ [p1, p2], [p1, p3], [p1, p4], [p2, p3], [p2, p4], [p3, p4] ]
        .map(([ax, ay], [bx, by]) => Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2))
        .sort((a, b) => a - b);

    let sidesEqual = side1 && new Set(distances.slice(0,4)) == 1,
        diagsEqual = distances[4] === distances[5];

    return sidesEqual && diagsEqual;
};
