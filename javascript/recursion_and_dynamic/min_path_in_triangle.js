/*
Define a pth in the triangle to be a sequence of entries in the triangle in which 
adjacent entries in the sequence correstpond to entries that are adjacent in the 
triangle. The path must start at the top, descend the triangle continuously, and 
end with an entry on the bottom row. The weight of a path is the sum of the entries. 
Write a progarm that takes as input a triangle of numbers and retunrn the weight 
of a  minimum weight path.

source: EPI 16.8
*/

function minPath(tri) {
    let memo = [...Array(tri.length + 1)]
        .map((_, i) => [...Array(i+1).fill(null)]);

    function _minPath(row,col){
        if(row > tri.length - 1)
            return 0;

        if(!memo[row+1][col])
            memo[row+1][col] = _minPath(row+1,col);
        if(!memo[row+1][col+1])
            memo[row+1][col+1] =_minPath(row+1,col+1);

        return Math.min(
            memo[row+1][col], 
            memo[row+1][col+1]) 
            + tri[row][col]  
    }
    return _minPath(0,0);
}

// test
describe('minPath', function() {
    beforeEach(function() {
        this.triangle = [[2],[4,4],[8,5,6],[4,2,6,2],[1,5,2,3,4]]
    })
    it('returns the weight of the minimum path in triangle', function() {
        expect(minPath(this.triangle)).toEqual(15);
    })
})