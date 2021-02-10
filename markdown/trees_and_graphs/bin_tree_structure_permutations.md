## Structural Permutations of Binary Trees

### Problem

Given number of nodes, generate all possible binary trees with unique tree structure.

source: Generate Binary Trees (EPI 15.8)

### Boardwork (Design)

![](../../images/bin_tree_structure_permutations.jpg)

### Analysis

tbd...

Time: O(x)
Space: O(x)

### Codework (Test)

Javascript implementation.

```javascript
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
```
(from [javascript\trees_and_graphs\bin_tree_structure_permutations.js](../../javascript/trees_and_graphs/bin_tree_structure_permutations.js))