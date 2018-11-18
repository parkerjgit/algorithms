/*
Compute the lowest common ancestor in a binary tree.

source: EPI 9.3
*/

const findLCA = (root , n1, n2) => {

    // node is a target node
    const _isTarget = (node) =>
        (node && (node.value === n1 || node.value === n2))

    // subtree has at least one target node in it
    const _hasTarget = (node) => 
        (node && (node.count > 0))

    // found LCA if current node is a target and other is in a subtree OR
    // one target in each subtree
    const _foundLCA = (root, left, right) =>      
        ((_isTarget(root) && (_hasTarget(left) || _hasTarget(right))) ||
        (!_isTarget(root) && (_hasTarget(left) && _hasTarget(right))))

    // found Target if current node is a target and other is NOT in a subtree
    const _foundTarget = (root, left, right) =>
        (_isTarget(root) && !(_hasTarget(left) || _hasTarget(right)))
    
    const _find = (root, n1, n2) => {
     
        if (!root) 
            return {lca: null, count: 0}

        // recurse left and right (post-order)
        let left = _find(root.left, n1, n2);
        let right = _find(root.right, n1, n2);

        if (_foundLCA(root, left, right)) 
            return {lca: root, count: 2};
        if (_foundTarget(root, left, right))
            return {lca: null, count: 1};

        // nothing special about this node, so pass results up
        return (left.count > 0) ? left : right;
    }

    return _find(root, n1, n2).lca;
}

describe('findLCA', function() {
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
    it('finds the lowest common ancestor of any two nodes in a binary tree', function() {
        expect(findLCA(root, 2, 6).value).toEqual(1)
        expect(findLCA(root, 4, 7).value).toEqual(2)
        expect(findLCA(root, 4, 6).value).toEqual(1)
        expect(findLCA(root, 3, 6).value).toEqual(3)
        expect(findLCA(root, 7, 5).value).toEqual(5)
        expect(findLCA(root, 8, 5)).toEqual(null)
    })
})