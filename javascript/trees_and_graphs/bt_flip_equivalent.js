/*
For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.
A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.
Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivelent or false otherwise.

source: Flip Equivalent Binary Trees (leetcode 951) - https://leetcode.com/problems/flip-equivalent-binary-trees/
*/

var flipEquiv = function(root1, root2) {

  // check root node
  if (!root1 && !root2) return true;
  if (!root1 || !root2) return false;
  if (root1.val !== root2.val) return false;

  // check subtrees recursively
  const regular = flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
  const flipped = flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);

  return regular || flipped;
};
