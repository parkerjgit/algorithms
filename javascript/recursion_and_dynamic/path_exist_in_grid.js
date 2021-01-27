/*
xxx

source: EPI 16.7 (Search for a sequence in a 2d array)
*/

function pathExistInGrid(grid, path) {

    let memo = {};

    const getAllCells = (grid) => {
        let allCells = [];
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                allCells.push([r,c])
            }
        }
        return allCells;
    }

    const getAdjacencies = (row, col) => {
        return [
            [row + 1, col], 
            [row - 1, col], 
            [row, col + 1], 
            [row, col - 1]
        ].filter(([r, c]) => {
            return (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length)
        })
    }

    let _pathExists = (row, col, i) => {

        if (grid[row][col] === path[i] && i === path.length - 1) {
            // found path!
            return true;
        }

        // memoize cell location (m, n) for path starting at index, i
        if (!memo[JSON.stringify([row, col, i])]) {
            memo[JSON.stringify([row, col, i])] = (() => {

                if (grid[row][col] !== path[i]) {
                    return false;
                }
                
                // this cell IS on path so if rest of path exists
                // starting from any of the adjacent cells, then
                // path exists!
                return getAdjacencies(row, col).map(([r, c]) => {
                    return _pathExists(r, c, i + 1);
                }).some(res => res === true);

            })();
        }

        return memo[JSON.stringify([row, col, i])];
    }

    // start path at each grid cell
    return getAllCells(grid).map(([row ,col]) => {
        return _pathExists(row, col, 0)
    }).some(res => res === true);
}

describe('pathExistInGrid', function() {
    beforeEach(function() {
        this.grid = [
            [1,2,3],
            [3,4,5],
            [5,6,7]
        ]
    })
    it('return true if path exists in grid, false otherwise', function() {
        expect(pathExistInGrid(this.grid, [1,3,4,6])).toEqual(true);
        expect(pathExistInGrid(this.grid, [1,3,7,6])).toEqual(false);
    })
})