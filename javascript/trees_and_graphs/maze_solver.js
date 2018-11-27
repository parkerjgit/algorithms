/*
Given a 2D array of black and white entries representing a maze 
with designated entrance and exit points, find [the shortest] path 
from the entrance to the exit, if one exist.

source: problem adapted from EPI xxx
*/

function mazeSolver(maze, start, [end_row, end_col]) {

    let solution;

    function _solve([row, col], path){

        // this path is too long, abort!
        if ( solution && path.length >= solution.length ) {
            return;
        }
        // found best solution so far!
        if (row === end_row && col === end_col) {
            solution = [...path, [row,col]];
            return;
        } 
        
        let [prev_row, prev_col] = (path.length > 0) 
            ? path[path.length - 1] 
            : [-1, -1];   

        // valid move respects boundries and doesn't backtrack
        const isValidMove = ([row, col]) => (
            row >= 0 && row < maze.length &&
            col >= 0 && col < maze[0].length &&
            maze[row][col] !== 1 &&
            !(row === prev_row && col === prev_col)
        )

        let nexts = [
            [ row + 1, col ],
            [ row - 1, col ],
            [ row, col + 1 ],
            [ row, col - 1 ]
        ].filter( next => isValidMove(next) )
        
        // try moving in every valid direction
        nexts.forEach(next => {
            _solve(next, [...path, [row,col]])
        })
    }

    _solve(start, [])
    return solution;
}

// test

describe('mazeSolver', function() {
    beforeEach(function() {
        this.maze = [
            [0,0,1,0,0],
            [0,1,1,0,1],
            [0,1,0,0,0],
            [0,0,0,1,0],
            [0,1,0,1,0]
        ]
    })
    it('find shortest solution to maze', function() {
        expect(mazeSolver(this.maze, [0,0], [4,4])).toEqual([[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[2,3],[2,4],[3,4],[4,4]])
    })
})