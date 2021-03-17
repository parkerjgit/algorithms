/*

source: https://leetcode.com/problems/surrounded-regions
*/

var solve = function(board) {
    
  if(board.length < 3) return board 
  
  for(var r=0;r<board.length;r++){
      for(var c=0;c<board[0].length;c++){
          if(board[r][c] == 'O' && isBorderCell(board, [r,c])){
            dfs(board, [r,c])
          }
      }
  }
  
  for(var r=0;r<board.length;r++){
      for(var c=0;c<board[0].length;c++){
          board[r][c] = ({ 'T': 'O', 'X': 'X', 'O': 'X' })[board[r][c]]
      }
  }
  
  return board
};

const isBorderCell = (board, [r,c]) => {
  return (r==0 || r==board.length-1 || c==0 || c==board[0].length-1);
}

const isInteriorCell = (board, [r,c]) => {
    return (r>0 && r<board.length-1 && c>0 && c<board[0].length-1);
}

const getNeighbors = (board, [r,c]) => {
  return [[r-1, c],[r+1, c],[r, c-1],[r, c+1]]
    .filter(([r,c]) => isInteriorCell(board, [r,c]) && board[r][c] == 'O')
}

function dfs(board, [r,c]) {
    board[r][c]='T';
    for (let neighbor of getNeighbors(board, [r,c])) {
      dfs(board, neighbor)
    }
}