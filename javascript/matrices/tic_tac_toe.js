/*
Assume the following rules are for the tic-tac-toe game on an n x n board between two players:

A move is guaranteed to be valid and is placed on an empty block.
Once a winning condition is reached, no more moves are allowed.
A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game.
Implement the TicTacToe class:

TicTacToe(int n) Initializes the object the size of the board n.
int move(int row, int col, int player) Indicates that player with id player plays at the cell (row, col) of the board. The move is guaranteed to be a valid move.

Constraints:

2 <= n <= 100
player is 1 or 2.
1 <= row, col <= n
(row, col) are unique for each different call to move.
At most n2 calls will be made to move.

source: Design Tic-Tac-Toe (lc 348) - https://leetcode.com/problems/design-tic-tac-toe/
*/


/**
 * Initialize your data structure here.
 * @param {number} n
 */
var TicTacToe = function(n) {
  this.rows = [...Array(n)].map(_=>[]);
  this.cols = [...Array(n)].map(_=>[]);
  this.dias = [...Array(2)].map(_=>[]);
  this.memberships = [...Array(2)].map(_=>[]); // cell -> rows,cols,diags cell belongs to
  this.vals = new Map(); // map serialized cell location to value, eg. '[1,0]' -> 1 (player 1)
  this.winner = 0;

  let cell;
  for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
          cell = JSON.stringify([r,c])
          this.rows[r][c] = cell;
          this.cols[c][r] = cell;
          this.memberships[cell] = [r,c,[]];
          this.counts.set(cell, [0,0,0]);
      }
  }

  for (let r = 0; r < n; r++) {

      cell = JSON.stringify([r,r]);
      this.dias[0][r] = cell;
      this.memberships[cell][2].push(0);

      cell = JSON.stringify([r,n-r-1]);
      this.dias[1][n-r-1] = JSON.stringify([r,n-r-1]);
      this.memberships[cell][2].push(1);
  }

};

/**
* Player {player} makes a move at ({row}, {col}).
      @param row The row of the board.
      @param col The column of the board.
      @param player The player, can be either 1 or 2.
      @return The current winning condition, can be either:
              0: No one wins.
              1: Player 1 wins.
              2: Player 2 wins.
* @param {number} row
* @param {number} col
* @param {number} player
* @return {number}
*/
TicTacToe.prototype.move = function(row, col, player) {

  if (this.winner) return this.winner;

  let cell = JSON.stringify([row,col]);

  // helper checks row, col, or diagonal for a win
  const isWin = (line) => line.every(cell => this.vals.get(cell) === player);

  // helper gets row, col, diags that cell be
  const getCandidates = (cell) => {
      let [ri, ci, diArr] = this.memberships[cell]
      return [
          this.rows[ri],
          this.cols[ci],
          ...diArr.map(di=>this.dias[di])
      ]
  };

  // update board state
  this.vals.set(cell, player);

  // check for win
  if (getCandidates(cell).some(isWin)) {
      this.winner = player;
  }

  return this.winner;
};

/**
* Your TicTacToe object will be instantiated and called as such:
* var obj = new TicTacToe(n)
* var param_1 = obj.move(row,col,player)
*/
