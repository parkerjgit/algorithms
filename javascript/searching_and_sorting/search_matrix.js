/*
xxx

source: EPI 11.6 search in a 2d sorted array
*/

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

const getRow = (matrix, row) => matrix[row];
const getCol = (matrix, col) => matrix.map(row => row[col]);

function matrixSearch(matrix, target) {

    function _search(left, right, top, bottom) {

        // down to a single row and col, so bin search them both
        if (left == right && top == bottom) {

            let topRow = getRow(matrix, top).splice(0,left),
                leftCol = getCol(matrix, left).splice(0,top);

            return [
                binSearch(topRow, target),
                binSearch(leftCol, target)
            ].some(search => search)
        }

        let midCol = Math.floor((left + right) / 2),
            midRow = Math.floor((top + bottom) / 2),
            curCell = matrix[midRow][midCol];

        // found it early
        if (curCell === target) {
            return true;
        }

        // recurse
        if (curCell < target) {
            return _search(left, midCol, top, midRow);
        } else {
            return _search(midCol, right, midRow, bottom);
        }

    }
    return _search(0, matrix[0].length - 1, 0, matrix.length - 1);
}

// test. tbd...