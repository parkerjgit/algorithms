/*
Find a root to leaf path with specified sum

You are given a binary tree where each node is labeled with a n integer. 
The path weitght of a node in such a tree is the sum of the integres on 
the unique path from th eroot to thatn nnod. Write a program which takes 
as input an integer and a binary tree with ineger node weights and checks 
if there exist a leaf whgose path weight equal lthe give integer.

source: EPI 9.6
*/

function hasRootToLeafSum(root, weight) {
    if (!root) 
        return false;
    if (!root.left && !root.right) 
        return weight === root.value;
    
    return (
        hasRootToLeafSum(root.left, weight - root.value) ||
        hasRootToLeafSum(root.right, weight - root.value)
    );
}

// test
describe('hasRootToLeafSum', function() {
    beforeEach(function() {
        function Node(value=null) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        //      1
        //     / \
        //    2   3
        //   / \   \
        //  4   5   6
        //     /
        //    7

        root = new Node(1) 
        root.left = new Node(2) 
        root.right = new Node(3) 
        root.left.left = new Node(4) 
        root.left.right = new Node(5) 
        root.right.right = new Node(6)
        root.left.right.left = new Node(7)
    })
    it('returns true if root to leaf path with specified sum exists', function() {
        expect(hasRootToLeafSum(root, 15)).toEqual(true);
        expect(hasRootToLeafSum(root, 7)).toEqual(true);
        expect(hasRootToLeafSum(root, 10)).toEqual(true);
    })
    it('returns false if root to leaf path with specified sum does NOT exist', function() {   
        expect(hasRootToLeafSum(root, 14)).toEqual(false);
        expect(hasRootToLeafSum(root, 4)).toEqual(false);
        expect(hasRootToLeafSum(root, 3)).toEqual(false);
        expect(hasRootToLeafSum(root, 8)).toEqual(false);
    })
})