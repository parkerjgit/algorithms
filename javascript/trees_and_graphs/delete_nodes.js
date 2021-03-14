/*
Given the root of a binary tree, each node in the tree has a distinct value. After deleting all nodes 
with a value in to_delete, we are left with a forest (a disjoint union of trees). Return the roots of 
the trees in the remaining forest. You may return the result in any order.

source: Delete Nodes And Return Forest (leetcode 1110) - https://leetcode.com/problems/delete-nodes-and-return-forest/
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
 var delNodes = function(root, to_delete) {  
  let result = [];
  let setToDelete = new Set(to_delete);
  
  // post-order dft helper
  const _dft = (root) => {
      if (!root) return null;
      
      root.left = _dft(root.left),
      root.right = _dft(root.right)
      
      // root IS deleted
      if (setToDelete.has(root.val)) {  
          if (root.left) result.push(root.left);
          if (root.right) result.push(root.right);
          return null;
      }

      // root is NOT deleted
      return root
  }
  
  if (_dft(root)) {
      result.push(root);
  }
  return result;
};