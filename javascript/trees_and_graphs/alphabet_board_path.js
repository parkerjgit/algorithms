/*
On an alphabet board, we start at position (0, 0), corresponding to character board[0][0].
Here, board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"], as shown in the diagram below.
We may make the following moves:

'U' moves our position up one row, if the position exists on the board;
'D' moves our position down one row, if the position exists on the board;
'L' moves our position left one column, if the position exists on the board;
'R' moves our position right one column, if the position exists on the board;
'!' adds the character board[r][c] at our current position (r, c) to the answer.
(Here, the only positions that exist on the board are positions with letters on them.)

Return a sequence of moves that makes our answer equal to target in the minimum number of moves.  You may return any path that does so.

source: Alphabet board path (leetcode 1138) - https://leetcode.com/problems/alphabet-board-path/
*/

// solution based on https://leetcode.com/problems/alphabet-board-path/discuss/1090457/JavaScript-O(N)-Time-Elegant-Solution
var alphabetBoardPath = function(target) {
  const board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]
  const coords = new Map();

  for(let r = 0; r < board.length; r++) {
      for(let c = 0; c < board[r].length; c++) {
          coords.set(board[r][c], [r, c]); // 'a' -> [0,0], ...
      }
  }

  let [rp, cp] = [0, 0]; // previous coordinate
  let moves = [];

  for(let char of target) {
      const [r, c] = coords.get(char);

      if(cp > c) moves.concat(Array(cp - c).fill('L'))
      if(rp > r) moves.concat(Array(rp - r).fill('U'))
      if(cp < c) moves.concat(Array(c - cp).fill('R'))
      if(rp < r) moves.concat(Array(r - rp).fill('D'))

      moves.push('!');
      [rp, cp] = [r, c]
  }
  return moves;
};

// bfs tbd...

var alphabetBoardPath = function(target) {
  let visited = [...Array(6)].map(row => Array(5).fill(0));
  let result = [];

  //console.log(getBoard());

  dft(0,0, visited, [], result, target, 0, getBoard());
  return result;
};

var getBoard = function() {
  let result = [...Array(6)].map(row => []);

  let i = 0;
  while (i < 26) {
      let [r,c] = [Math.floor(i/5), i % 5];
      result[r][c] = String.fromCharCode(i + 'a'.charCodeAt(0));
      i++;
  }
  return result;
}

var getNeighbors = function(row,col) {
  return [
      [row+1, col],
      [row-1, col],
      [row, col+1],
      [row, col-1]
  ].filter(([r,c]) => isInBounds(r,c))
}

var isInBounds = function(row,col) {
  return [
      row >= 0,
      col >= 0,
      row < 6,
      col < 5,
      !(row == 5 && col > 0)
  ].every(x => x);
}

var dft = function(row, col, visited, path, result, target, i, board) {

  //console.log(board)

  if (board[row][col] === target[i]) {
      result.concat(path);
      result.push('!');
      visited = new Set();
      path = [];
      i++;
      return true;
  }

  // else, keep looking
  path.push(board[row][col]);
  visited[row][col] = 1;

  return getNeighbors().some(([r,c]) => {
      return dft(r,c, visited, path, result, target, i, board)
  })

}

