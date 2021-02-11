/*
Given a 2D array of black and white entries representing a maze
with designated entrance and exit points, find [the shortest] path
from the entrance to the exit, if one exist.

source: problem adapted from EPI 18.1
*/

// simple solution for acyclic maze
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

// clumsy first attempt to optimize for cyclic mazes
// finds solution ok using dfs,
// but caches non-determistically resulting in
// non-optimal paths.
function mazeSolver2(maze, start, [end_row, end_col]) {

    let memo = [...Array(maze.length)].map( _ => (
        Array(maze[0].length).fill(null)
    ))

    function _solve(seen, [row, col]) {

        if (row === end_row && col === end_col) {
            return [[row,col]];
        } else {
            seen.add(''.concat(row, '-', col));
        }

        // valid move respects boundries and doesn't double back on itself
        const isValidMove = ([row, col]) => (
            row >= 0 && row < maze.length &&
            col >= 0 && col < maze[0].length &&
            maze[row][col] !== 1 &&
            !seen.has(''.concat(row, '-', col))
        )

        // cache and lookup path
        const lookupPath = ([row, col]) => {
            if (!memo[row][col])
                memo[row][col] = _solve(new Set(seen), [row, col]);

            return memo[row][col];
        }

        // compare paths and return shortest valid
        const getMinPath = (a, b) => {
            if (a[a.length - 1] === null) {
                return b;
            } else if (b[b.length - 1] === null) {
                return a;
            } else {
                return (b.length < a.length) ? b : a;
            }
        }

        // select the shortest successful path from a valid next step to finish
        let minPath = [
            [ row + 1, col ],
            [ row, col + 1 ],
            [ row - 1, col ],
            [ row, col - 1 ]
        ]
        .filter(next => isValidMove(next))
        .map(next => lookupPath(next))
        .reduce((minSoFar, path) => getMinPath(minSoFar, path), [null])

        // return combination of this cell with min path to this cell
        return [[row, col], ...minPath]
    }

    return _solve(new Set(), start);
}


// function mazeSolver3(maze, start, [end_row, end_col]) {

//     let score = [...Array(maze.length)].map( _ => (
//         [...Array(maze[0].length)].map( _ => (
//             {f: Infinity, g: Infinity}
//         ))
//     ))

//     function _solve(seen, [row, col]) {

//         if (row === end_row && col === end_col) {
//             return [[row,col]];
//         }

//         // valid move respects boundries and doesn't double back on itself
//         const isValidMove = ([row, col]) => (
//             row >= 0 && row < maze.length &&
//             col >= 0 && col < maze[0].length &&
//             maze[row][col] !== 1 &&
//             !seen.has(''.concat(row, '-', col))
//         )

//         // cache and lookup path
//         const lookupPath = ([row, col]) => {
//             if (!score[row][col])
//                 score[row][col] = _solve(new Set(seen), [row, col]);

//             return score[row][col];
//         }

//         // compare paths and return shortest valid
//         const getMinPath = (a, b) => {
//             if (a[a.length - 1] === null) {
//                 return b;
//             } else if (b[b.length - 1] === null) {
//                 return a;
//             } else {
//                 return (b.length < a.length) ? b : a;
//             }
//         }

//         // select the shortest successful path from a valid next step to finish
//         let minPath = [
//             [ row + 1, col ],
//             [ row, col + 1 ],
//             [ row - 1, col ],
//             [ row, col - 1 ]
//         ]
//         .filter(next => isValidMove(next))
//         .map(next => lookupPath(next))
//         .reduce((minSoFar, path) => getMinPath(minSoFar, path), [null])

//         // return combination of this cell with min path to this cell
//         return [[row, col], ...minPath]
//     }

//     return _solve(new Set(), start);
// }


// test

function pathPrint(maze, [start_row, start_col], [finish_row, finish_col], path) {
    path.forEach(([r,c]) => {
        maze[r][c] = 2;
    })
    maze[start_row][start_col] = 3;
    maze[finish_row][finish_col] = 4;

    let result = ''
    const SYM = [' . ', ' * ', ' o ', ' s ', ' f ']
    maze.forEach((r,i) => {
        let row = ''
        r.forEach((_,j) => {
            row += SYM[maze[i][j]];
        })
        result += row + '\n';
    })
    console.log(result)
}

describe('mazeSolver', function() {
    beforeEach(function() {
        this.maze = [
            [0,0,1,0,0],
            [0,1,1,0,1],
            [0,1,0,0,0],
            [0,0,0,1,0],
            [0,1,0,1,0]
        ]
        this.maze2 = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,1,0,0,0,0,0],
            [0,1,0,0,1,0,1,1,0,0],
            [0,1,0,0,0,0,0,1,0,0],
            [0,0,0,0,1,0,0,1,0,0],
            [0,1,0,1,1,0,0,1,1,0],
            [0,1,0,0,1,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0],
            [0,1,1,0,1,0,0,1,0,0],
            [0,1,0,0,1,0,0,0,0,0],
        ]
        this.maze3 = [
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]
    })
    // it('find shortest solution to maze', function() {
        // expect(mazeSolver(this.maze, [0,0], [4,4])).toEqual([[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[2,3],[2,4],[3,4],[4,4]])
        // expect(mazeSolver(this.maze, [0,0], [4,4])).toEqual([[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[2,3],[2,4],[3,4],[4,4]])
        // pathPrint(this.maze, [0,0], [4,4], mazeSolver2(this.maze, [0,0], [4,4]))
        // pathPrint(this.maze2, [0,0], [9,9], mazeSolver2(this.maze2, [0,0], [9,9]))
        // pathPrint(this.maze3, [0,0], [18,16], mazeSolver2(this.maze3, [0,0], [18,16]))
    // })
})
