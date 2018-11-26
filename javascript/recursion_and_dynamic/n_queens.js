/*
Write a program which returns all distinct nonattaching placements 
of n queens on a x x n chessboard, where n is an input to the program.

source: EPI 15.2
*/

function nQueens(n) {

    let solutions = [];

    // check for *any* conflicts with queens on preceeding rows
    function _conflicts(queens, candidate) {
        return queens.some(queen => (
            ( queen.col === candidate.col ) || 
            ( Math.abs(candidate.col - queen.col) === (candidate.row - queen.row) )
        ))
    }

    // solve for remaining rows, row to n-1, given queens on preceeding rows.
    function _solve(queens, row) {
        if ( row === n ) {
            // found solution!
            solutions.push(queens);
        } else {
            // try queen at each position in this row
            [...Array(n).keys()].forEach(col => {
                if ( !_conflicts(queens, {row, col}) ) {
                    _solve([...queens, {row, col}], row + 1);
                } 
            })
            // try no queens in this row
            _solve(queens, row + 1);
        }
    }

    _solve([], 0);
    return solutions;
}

// test

function serialize(solutions) {
    let result = []
    solutions.forEach(sol => {
        let serialized = ''
        sol.forEach(({row,col}) => {
            serialized += `-${row},${col}`
        })
        result.push(serialized.slice(1));
    })
    return result;
}

describe('nQueens', function() {
    it('returns all distince non-attacking placements of n queens on an n x n chessboard', function() {
        expect(serialize(nQueens(1))).toEqual(["0,0", ""])
        expect(serialize(nQueens(2))).toEqual(["0,0", "0,1", "1,0", "1,1", ""])
        expect(serialize(nQueens(3))).toEqual(["0,0-1,2", "0,0-2,1", "0,0", "0,1-2,0", "0,1-2,2", "0,1", "0,2-1,0", "0,2-2,1", "0,2", "1,0-2,2", "1,0", "1,1", "1,2-2,0", "1,2", "2,0", "2,1", "2,2", ""])
    })
})