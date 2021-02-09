/*
Given number of nodes, generate all possible binary trees with unique tree structure.

source: Generate Binary Trees (EPI 15.8)
*/

function BinTreeNode(value=null, left=null, right=null) {
    this.value = value;
    this.left = left;
    this.right = right;
}

function genBinTrees(n) {

    if (n == 0) {
        return [null];
    }

    let result = [];

    // number of nodes in left subtrees can be 0, 1, ...n-1
    [...Array(n).keys()].forEach(ln => {
        let leftSubtrees = genBinTrees(ln),
            rightSubtrees = genBinTrees(n - ln - 1);
        
        // combine all pairs of possible left and right subtrees
        leftSubtrees.forEach(left => {
            rightSubtrees.forEach(right => {
                result.push(new BinTreeNode(null, left, right))
            })
        })
    })

    return result;
}

// Test

describe('genBinTrees', () => {
    it('generates the correct number of structural permutations', () => {
        expect(genBinTrees(0).length).toEqual(1);
        expect(genBinTrees(1).length).toEqual(1);
        expect(genBinTrees(2).length).toEqual(2);
        expect(genBinTrees(3).length).toEqual(5);
        expect(genBinTrees(4).length).toEqual(14);
        expect(genBinTrees(5).length).toEqual(42);
        expect(genBinTrees(6).length).toEqual(132);
        expect(genBinTrees(7).length).toEqual(429 );
        expect(genBinTrees(8).length).toEqual(1430);
        expect(genBinTrees(9).length).toEqual(4862);
        expect(genBinTrees(10).length).toEqual(16796);
    })

    // TODO: validate the structures
})