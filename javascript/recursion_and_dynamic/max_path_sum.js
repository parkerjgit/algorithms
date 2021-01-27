/*
By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

   3
  7 4
 2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom in triangle.txt (right click and 'Save Link/Target As...'), a 15K text file containing a triangle with one-hundred rows.

source: Maximum Path Sum II (project euler, problem 67) - https://projecteuler.net/problem=67
*/

function maxPathSum(pyramid) {

    // copy input array (can re-use input array instead if ok to mutate)
    const memo = [
        ...pyramid.map(arr => [...arr]), 
        Array(pyramid[pyramid.length - 1].length + 1).fill(0)
    ];

    // preprocess from bottom up
    [...Array(pyramid.length).keys()].reverse().forEach(n => {
        [...Array(pyramid[n].length).keys()].forEach(m => {
            memo[n][m] += Math.max(
                memo[n + 1][m],     // left
                memo[n + 1][m + 1]  // right
            )
        })
    })

    return memo[0][0];
}