/*
xxx

source: EPI
*/

const inBounds = (grid, r, c) => {
    return [
        r < 0, r >= grid.length, 
        c < 0, c >= grid[0].length
    ].some(test => test)
}

const getNeighbors = (grid, r, c) => {
    return [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1]
    ].filter(([r, c]) => inBounds(grid, r, c))
}

function fill(img, i, j) {

    let newColor = !img[i][j];

    function _fill(i,j) {

        if (img[i][j] !== newColor) {       
            img[i][j] = newColor;

            let neighbors = getNeighbors(img, i, j);
            neighbors.forEach(pixel => {
                _fill(...pixel)
            })
        }
    }

    _fill(i,j);
}

function fill(img, i, j) {

    let newColor = !img[i][j];
    let q = [[i,j]];

    while(q.length) {
        let [i, j] = q.pop();
        img[i,j] = newColor;
        let neighbors = getNeighbors(img, i, j);
        neighbors.forEach( pixel => {
            q.push(pixel)
        })
    }
}

// test

describe('fill', function() {
    it('flips cell values inside boundary of adjacent pixels', function() {
        expect(fill(imgBefore, i, j)).toEqual(imgAfter);
    })
})