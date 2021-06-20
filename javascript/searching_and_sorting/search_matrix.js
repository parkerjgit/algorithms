/*
Design an algorithm that takes a 2D sorted array and a number and checks whether that number appears in the array.

source: EPI 11.6 search in a 2d sorted array
*/

// solutions for 2d-sorted matrix (ie accending along rows and cols, ie min at upper left, max at lower right)

// overly complicated and untested solution:
function matrixSearch(matrix, target) {

    function _search(left, right, top, bottom) {

        let midCol = Math.floor((left + right) / 2),
            midRow = Math.floor((top + bottom) / 2),
            curCell = matrix[midRow][midCol];

        // found it!
        if (curCell === target) {
            return {contains: true, idx: [midRow, midCol]};
        }

        // not in this region
        if (left == right && top == bottom) {
            return {contains: false, idx: [left, top]}
        }

        // check top-left and bottom-right regions
        let results = (curCell < target)
            ? _search(left, midCol, top, midRow)
            : _search(midCol, right, midRow, bottom);

        // find or pivot
        if (results.contains) {
            return results;
        } 
        let [pivRow, pivCol] = results.idx;

        // check bbub  
        let bottomLeft = _search(left, pivCol, pivRow, bottom)
        let topRight = _search(pivCol, right, top, pivRow);

        if (bottomLeft.contains) {
            return bottomLeft
        } else if (topRight.contains) {
            return topRight
        } else {
            return {contains: false, idx: -1}
        }
    }
    let {contains} = _search(0, matrix[0].length - 1, 0, matrix.length - 1);
    return contains;
}

//linear search + search space trimming - O(n+m)
var searchMatrix = function(matrix, target) {
    let [row, col] = [0, matrix[0].length];
    
    while (row < matrix.length && col > -1) {
        if (matrix[row][col] === target) {
            return true
        } else if (matrix[row][col] < target) {
            row++;
        } else { // matrix[row][col] > target
            col--;
        }
    }
    
    return false;
};


//bin search each row with trimmed search space - O(mlogn) worst case for large target, but O(m) best case for small targets
var searchMatrix = function(matrix, target) {
  let [left, right] = [0, matrix[0].length];

  for (row of matrix) {
    
    while (left < right) {
      let mid = left + Math.floor((right - left)/2);

      if (row[mid] === target) {
        return true;
      } else if (row[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (row[left] < target) {
        right = left + 1
      } else {
        right = left;
      }
    
    left = 0;

  }

  return false;
}


// see https://leetcode.com/problems/search-a-2d-matrix-ii/discuss/415360/Python3-Brute-Force-Binary-Search-Search-Space-Reduction-Solutions

// solution for 1d-sorted matrix (ie if flattened, the result would be a sorted array, eg. [[1,2,3],[4,5,6],[7,8,9]])
function matrixSearch(matrix, target) {
    return matrixBinSearch(matrix, 0, matrix.length, target)
}

function matrixSearch(matrix, left, right, target) {

    let mid = getMiddleCellIdx(matrix, left, right);
  
    if (isCellIdxGT(left, right)) {                 // if left > right, not found.
        return -1;
    }
    if (getCellValueAt(matrix, mid) === target) {   // if mid == target, found it.
        return mid;
    }

    if (getCellValueAt(matrix, mid) < target) {     // if mid < target, go right
        return matrixSearch(matrix, getNextCellIdx(matrix, mid), right, target);

    } else {                                        // if mid > target, go left
        return matrixSearch(matrix, left, getNextCellIdx(matrix, right), target);
    }
}

const getCellValueAt = (matrix, [left, right]) => matrix[left][right];

const isCellIdxGT = ([aRow, aCol], [bRow, bCol]) => (aRow > bRow) || (aCol > bCol);

const getMiddleCellIdx = (matrix, left, right) => {}

const getNextCellIdx = (matrix, [row,col]) => {
  let [height, width] = [matrix.length, matrix[0].length];

  if (col < width - 1) {
    return [row, col + 1]
  } else if (row < height - 1) { // last in row
    return [row + 1, 0]
  } else { // last el in matrix
    return null;
  }
}