/*
The boundary of a binary tree is the concatenation of the root, the left boundary, the leaves ordered from left-to-right, and the reverse order of the right boundary.

The left boundary is the set of nodes defined by the following:

The root node's left child is in the left boundary. If the root does not have a left child, then the left boundary is empty.
If a node in the left boundary and has a left child, then the left child is in the left boundary.
If a node is in the left boundary, has no left child, but has a right child, then the right child is in the left boundary.
The leftmost leaf is not in the left boundary.
The right boundary is similar to the left boundary, except it is the right side of the root's right subtree. Again, the leaf is not part of the right boundary, and the right boundary is empty if the root does not have a right child.

The leaves are nodes that do not have any children. For this problem, the root is not a leaf.

Given the root of a binary tree, return the values of its boundary.

source: Boundary of Binary Tree (lc 545) - https://leetcode.com/problems/boundary-of-binary-tree/
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
 * @return {number[]}
 */
var boundaryOfBinaryTree = function(root) {
  let left = [], right = [], bottom = [];

  function dft(root, [onLeft, onRight]) {
    if (!root) return;

    // check for leaves
    if (!root.left && !root.right) {
      bottom.push(root.val);
      return;
    }

    // check for boundary
    if (onLeft) left.push(root.val);
    if (onRight) right.push(root.val);

    // a. on left boundary
    if (onLeft && root.left) {
        dft(root.left, [true, false]);
        dft(root.right, [false, false]);
    } else if (onLeft && root.right) {
        dft(root.right, [true, false]);

    // b. on right boundary
    } else if (onRight && root.right) {
      dft(root.left, [false, false]);
      dft(root.right, [false, true]);
    } else if (onRight && root.left) {
      dft(root.left, [false, true]);

    // c. internal node
    } else {
        dft(root.left, [false, false]);
        dft(root.right, [false, false]);
    }
  }

  dft(root.left, [true, false]);
  dft(root.right, [false, true]);

  return [root.val].concat(left, bottom, right.reverse());
};
