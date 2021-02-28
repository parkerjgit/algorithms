# Binary Search Trees (BST)

## Implement BST with add, search, and min/max

## Traverse BST in four ways: DFT (pre-order, in-order, post-order) and BFT

## Get all root-to-leaf paths by building each path: (1) on way down, and (2) on way up

## Get all levels

## Validate BST

1. Visit BST nodes in-order (i.e. sorted order).
2. If any node is less than previous node, BST is invalid.
3. Stop traversing as soon as BST is invalidated.

```js
var isValidBST = function(root) {
    
    let prev = Number.NEGATIVE_INFINITY,
        isValid = true;
    
    const inorder = (root) => {
        if (root && isValid) {
            inorder(root.left);
            
            if (root.val <= prev) {
                isValid = false;
            } else {
                prev = root.val;
            }
            
            inorder(root.right);
        }
    }
    
    inorder(root);
    return isValid;
};
```

## Balance BST

## Applications of BST

## BST Problems

1. Fix a BST with 2 swapped nodes. (lc 99) - perform in-order traversal, find and mark nodes in violation of bst, then fix.
1. Are 2 trees the same? (lc 100) - if roots are the same and the left and right subtrees are the same, then the trees are same.
1. Are 2 trees symmetric? (lc 101) - tree is symmetric if subtrees are mirror reflections, two trees are mirror reflections if (a) roots are same and (b) right subtree is mirror reflection of left subtree (and vis-versa).
1. 

https://leetcode.com/tag/tree/