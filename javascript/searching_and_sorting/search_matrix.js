/*
Design an algorithm that takes a 2D sorted array and a number and checks whether that number appears in the array.

source: EPI 11.6 search in a 2d sorted array
*/

// not used
function binSearch(arr, target) {

    function _search(left, right) {

        // does not exist
        if (left > right) {
            return false; // or -1
        }

        let mid = Math.floor((right + left) / 2);

        // found it
        if (arr[mid] === target) {
            return true; // or mid
        } 

        // recurse
        if (arr[mid] < target) {
            return _search(left, mid - 1);
        } else {
            return _search(mid + 1, right);
        }
    }
    return _search(0, arr.length - 1);
}

// not used
const getRow = (matrix, row) => matrix[row];
const getCol = (matrix, col) => matrix.map(row => row[col]);

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

        // check bottom-left and top-right regions 
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

// test. tbd...