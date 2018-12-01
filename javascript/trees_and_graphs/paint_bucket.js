/*
xxx

source: EPI
*/

const outOfBounds = (grid, r, c) => {
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
    ].filter(([r, c]) => !outOfBounds(grid, r, c))
}

function fill(img, i, j) {

    let newColor = img[i][j] ? 0 : 1;

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

function fill2(img, i, j) {

    let newColor = img[i][j] ? 0 : 1;
    let q = [[i,j]];

    while(q.length) {
        let [i, j] = q.pop();
        img[i][j] = newColor;
        let neighbors = getNeighbors(img, i, j);
        neighbors.forEach(([i, j]) => {
            if (img[i][j] !== newColor) { 
                q.push([i, j])
            }
        })
    }
}

// test

describe('fill', function() {
    beforeEach(function() {
        this.img = [
            [0,0,0,1,0],
            [1,1,0,1,0],
            [0,0,0,1,0],
            [0,0,1,0,0],
            [0,0,0,1,0]
        ]
        this.imgAfter = [
            [1,1,1,1,0],
            [1,1,1,1,0],
            [1,1,1,1,0],
            [1,1,1,0,0],
            [1,1,1,1,0]
        ]
    })

    it('can determine if cell is in bounds', function() {
        expect(outOfBounds(this.img, -1, 2)).toEqual(true);
        expect(outOfBounds(this.img, 0, 0)).toEqual(false);
        expect(outOfBounds(this.img, 1, 2)).toEqual(false);
        expect(outOfBounds(this.img, 1, -2)).toEqual(true);
    })
    it('can get inbound neighbors for each cell', function() {
        expect(getNeighbors(this.img, 2, 2)).toEqual([[3,2],[1,2],[2,3],[2,1]]);
    })
    it('flips cell values inside boundary of adjacent pixels', function() {
        fill(this.img, 2, 2);
        expect(this.img).toEqual(this.imgAfter);
    })
    it('flips cell values inside boundary of adjacent pixels', function() {
        fill2(this.img, 2, 2);
        expect(this.img).toEqual(this.imgAfter);
    })
})