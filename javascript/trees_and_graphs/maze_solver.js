/*
xxx

source: EPI xxx
*/

function mazeSolver(maze, start, end) {

    let solution;

    function _solve({row, col}, path){

        // this path is too long, abort!
        if ( solution && path.length >= solution.length ) {
            return;
        }
        // found best solution so far!
        if (row === end.row && col === end.col) {
            solution = path;
            return;
        } 
        
        let prev = path[path.length -1]        

        // valid move respects boundries and doesn't backtrack
        const isValidMove = ({row, col}) => (
            row >= 0 && row < maze.length &&
            col >= 0 && col < maze[0].length &&
            maze[row][col] !== 1 &&
            (row === prev.row && col === prev.col)
        )

        let nexts = [
            { row: row + 1, col },
            { row: row - 1, col },
            { row, col: col + 1 },
            { row, col: col - 1 }
        ].filter( next => isValidMove(next))
        
        // try moving in every valid direction
        nexts.forEach(next => {
            _solve(next, [...path, [row,col]])
        })
    }

    _solve(start, [])
    return solution;
}