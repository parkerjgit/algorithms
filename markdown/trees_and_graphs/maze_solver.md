## Solve a maze

### Problem

Given a 2D array of black and white entries representing a maze 
with designated entrance and exit points, find [the shortest] path 
from the entrance to the exit, if one exist.

source: adapted from EPI 18.1

### Boardwork (Design)

![](../../images/maze_solver.jpg)

### Analysis

Time: O(x)
Space: O(x)

### Codework (Test)

Naive solution for acyclic maze.

```javascript
function mazeSolver(maze, start, [end_row, end_col]) {

    let solution;

    function _solve([row, col], path){

        // path is too long, abort!
        if ( solution && path.length >= solution.length ) {
            return;
        }
        // best solution so far!
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
```
(from [maze_solver.js](../../javascript/trees_and_graphs/maze_solver.js))

First attempt to handle cyclic/sparse mazes. Finds solution ok using dfs, but caches non-determistically to prevent paths from doubling back, resulting in non-optimal paths. Could improve with heuristics.

```javascript
function mazeSolver(maze, start, [end_row, end_col]) {
    
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
```

### Links

https://en.wikipedia.org/wiki/A*_search_algorithm
https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
https://www.youtube.com/watch?v=aKYlikFAV4k